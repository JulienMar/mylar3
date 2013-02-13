import mylar
from mylar import db, logger, helpers
import os
import shutil


def movefiles(comicid,comlocation,ogcname,imported=None):
    myDB = db.DBConnection()
    print ("comlocation is : " + str(comlocation))
    print ("original comicname is : " + str(ogcname))
    impres = myDB.action("SELECT * from importresults WHERE ComicName=?", [ogcname])

    if impres is not None:
        #print ("preparing to move " + str(len(impres)) + " files into the right directory now.")
        for impr in impres:
            srcimp = impr['ComicLocation']
            orig_filename = impr['ComicFilename']
            orig_iss = impr['impID'].rfind('-')
            orig_iss = impr['impID'][orig_iss+1:]
            print ("Issue :" + str(orig_iss))
            #before moving check to see if Rename to Mylar structure is enabled.
            if mylar.IMP_RENAME:
                print("Renaming files according to configuration details : " + str(mylar.FILE_FORMAT))
                renameit = helpers.rename_param(comicid, impr['ComicName'], orig_iss, orig_filename)
                nfilename = renameit['nfilename']
                dstimp = os.path.join(comlocation,nfilename)
            else:
                print("Renaming files not enabled, keeping original filename(s)")
                dstimp = os.path.join(comlocation,orig_filename)

            logger.info("moving " + str(srcimp) + " ... to " + str(dstimp))
            try:
                shutil.move(srcimp, dstimp)
            except (OSError, IOError):
                logger.error("Failed to move files - check directories and manually re-run.")
        #print("files moved.")
    #now that it's moved / renamed ... we remove it from importResults or mark as completed.
        results = myDB.action("SELECT * FROM importresults WHERE ComicName=?", [ogcname])
        if results is None: pass
        else:
            for result in results:
                controlValue = {"impID":    result['impid']}
                newValue = {"Status":           "Imported" }
                myDB.upsert("importresults", newValue, controlValue)
    return