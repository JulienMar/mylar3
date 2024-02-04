function show_toast(title, message, status) {
    var toastContainer = document.getElementById('toastContainer')
    var toaster = document.getElementById('liveToast');
    var toasterHeader = document.getElementById('toast-header')       

    toaster.classList.remove('bg-success-subtle', 'bg-danger-subtle', 'bg-info');
    toasterHeader.classList.remove('bg-success-subtle', 'bg-danger-subtle', 'bg-info')
    toaster.classList.add(status);
    toasterHeader.classList.add(status)
    toaster.querySelector('.toast-title').innerHTML = title;
    toaster.querySelector('.toast-body').innerHTML = message;


    var visibleToast = new bootstrap.Toast(toaster, {'autohide': true, 'delay': 5000});
    visibleToast.show();
}
