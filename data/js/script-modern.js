function doAjaxCallModern(url,elem,reload,form,method) {
	// Get Form data
    // TODO understand this
 	var formID = "#"+url;
	if ( form == true ) {
		var dataString = $(formID).serialize();
                if ( !method ) {
                    method = 'get';
                }
                // jquery > 1.9.0 has 'type' set as an alias for 'method' for backwards compatibility.
                //alert('method used:'+method);
	} 

	// Data Success Message
	var dataSucces = $(elem).data('success');
	if (typeof dataSucces === "undefined") {
		// Standard Message when variable is not set
		var dataSucces = "Success!";
	}
	// Data Errror Message
	var dataError = $(elem).data('error');
	if (typeof dataError === "undefined") {
		// Standard Message when variable is not set
		var dataError = "There was an error!";
	}

    // TODO figure this out
	// Check if checkbox is selected
	/* if ( form ) {
		if ( $('td#select input[type=checkbox]').length > 0 && !$('td#select input[type=checkbox]').is(':checked') ) {
			feedback.addClass('error')
			$(feedback).prepend(errorMsg);
			setTimeout(function(){
				errorMsg.fadeOut(function(){
					$(this).remove();
					feedback.fadeOut(function(){
						feedback.removeClass('error');
					});
				})
				$(formID + " select").children('option[disabled=disabled]').attr('selected','selected');
			},2000);
			return false;
		}
	} */

	// Ajax Call
	$.ajax({
        url: url,
        type: method,
        data: dataString,
        beforeSend: function(jqXHR, settings) {
            // Stub
        },
        error: function(jqXHR, textStatus, errorThrown)  {
            show_toast("There was an error!", dataError, "bg-danger-subtle")
        },
        success: function(data,jqXHR) {
            show_toast("Succes!", dataSucces, "bg-success-subtle")
            if (reload == true) {
                refreshSubmenu()
            }

            if(reload == "table") {
                console.log('refresh');
                refreshTable();
            }

            if (reload == "tabs") {
                refreshTab();
            }

            if (form) {
                $(formID + " select").children('option[disabled=disabled]').attr('selected','selected');
            }
            
        },
        complete: function(jqXHR, textStatus) {
            // Remove loaders and stuff, ajax request is complete!300
        }
	});
}