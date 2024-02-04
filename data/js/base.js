function show_toast(title, message, status) {
    var toaster = document.getElementById('liveToast');
    var toasterHeader = document.getElementById('toast-header')       

    toaster.classList.remove('bg-success-subtle', '.bg-danger-subtle');
    toasterHeader.classList.remove('bg-success-subtle', '.bg-danger-subtle')
    toaster.classList.add(status);
    toasterHeader.classList.add(status)                                       // could be dynamic value class (for css)
    toaster.querySelector('.toast-title').innerHTML = title;        // could be dynamic value title
    toaster.querySelector('.toast-body').innerHTML = message;   // could be dynamic value message


    var visibleToast = new bootstrap.Toast(toaster, {'autohide': true, 'delay': 5000});
    visibleToast.show();
}