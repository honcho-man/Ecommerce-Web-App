/**pin form */
const pinForm = $('.-pin-form form'),
pinInput = $('.-pin-input'),
pinLoader = '<i class="fa fa-spin fa-spinner"></i>',
pinSuccessIcon = '<i class="fa fa-check-circle success-icon"></i>',
pinLinkSection = $('.-pin-link-section'),
pinSubmitBtn = $('.-pin-submit-btn'),
pinSuccessSection = $('.-pin-success-section');
//pin functions
pinFormSubmit = function () {
    pinForm.trigger('submit');
},
pinDisableInput = function (input) {
    input.attr('disabled', true)
},
pinDisableLink = function (a) {
    a.removeAttr('href')
},
pinDisableSubmitBtn = function (btn) {
    btn.attr('disabled', true)
    pinLoadSubmitBtn()
},
pinLoadSubmitBtn = function () {
    pinSubmitBtn.find('.submit-text').fadeOut('fast')
    setTimeout(() => {
        pinSubmitBtn.find('.submit-loader').fadeIn('slow')
    }, 100);
},
pinEnableInput = function (input) {
    input.removeAttr('disabled').val('')
    setTimeout(() => {
        input.addClass('fail-pin')
    }, 250);
},
pinEnableLink = function (a) {
    a.attr('href', '#')
},
pinEnableSubmitBtn = function (btn) {
    btn.removeAttr('disabled')
    pinUnloadSubmitBtn(btn)
},
pinUnloadSubmitBtn = function () {
    pinSubmitBtn.find('.submit-loader').fadeOut('fast')
    setTimeout(() => {
        pinSubmitBtn.find('.submit-text').fadeIn('fast')
    }, 150);
},
submitPinForm = function () {
    $.ajax({
        method: 'POST',
        url: '/verify-email-pin',
        data: {
            pin: pinInput.val(),
            email: email
        },
        error: function (res) {
            pinErr(res.responseJSON.alert, res.responseJSON.errType)
        },
        success: function (res) {
            pinSuccess(res.alert)
        }
    })
},
pinErr = function (alert, errType) {
    alertBox.addClass('fail-box').fadeIn('slow')
    alertBox.find('span').html(alert)
    if (errType !== 'Err') {
        setTimeout(() => {
            alertBox.fadeOut('fast')
        }, 3500);
    }
    setTimeout(() => {
        pinEnableInput(pinInput)
        pinEnableLink(pinLinkSection.find('a'))
        pinEnableSubmitBtn(pinSubmitBtn)
    }, 250);
},
pinSuccess = function (res) {
    setTimeout(() => {
        $('.-pin-form').fadeOut('fast')
        setTimeout(() => {
            pinSuccessSection.fadeIn('slow').append(pinSuccessIcon)
        }, 500);
    }, 250);
}

//focus on input onclick
pinForm.on('click', () => {
    pinInput.trigger('focus')
    if (pinInput.hasClass('fail-pin') && alertBox.hasClass('fail-box')) {
        alertBox.fadeOut('fast')
    }
})

//fire form when pin is four
pinInput.on('keyup',function( event ) {
    let input = $(this),
        form = pinForm;
    if (input.val().length == 4 ) {
        event.preventDefault();
        input.blur()
        pinFormSubmit();
    }
})

//require only numbers in pin input
pinInput.on('keypress',function (e) {
    let charCode = (e.which) ? e.which : event.keyCode
    if (String.fromCharCode(charCode).match(/[^0-9]/g)) {
        return false
    }
})

//focus on input
pinInput.trigger('focus').val('')

//remove errs on focus
pinInput.on('focus', function() {
    if ($(this).hasClass('fail-pin')) {
        $(this).removeClass('fail-pin')
    }
})

//require pin if empty
pinSubmitBtn.on('click', function() {
    if (pinInput.val().length < 1 || pinInput.val().length < 2 || pinInput.val().length < 4) {
        pinInput.addClass('fail-pin')
    }
    console.log('hey')
})

//pin form on submit
pinForm.on('submit', (e) => {
    e.preventDefault()
    let form = $(this);
    
    if (pinInput.val().length < 1 || pinInput.val().length < 2 || pinInput.val().length < 4) {
        pinInput.addClass('fail-pin')
    } else {
        pinDisableInput(pinInput)
        pinDisableLink(pinLinkSection.find('a'))
        pinDisableSubmitBtn(pinSubmitBtn)
        setTimeout(() => {
            submitPinForm()
        }, 1500);
    }
})