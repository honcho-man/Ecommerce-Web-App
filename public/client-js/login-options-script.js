var alertBox = $('.alert'),
    alertBoxSpan = $('.alert span');
$(document).ready(function () {
    if (!alertBoxSpan.is(':empty')) {
        setTimeout(() => {
            alertBox.fadeOut('slow')
        }, 3000);
    } else {
        alertBox.fadeIn('slow')
    }
});