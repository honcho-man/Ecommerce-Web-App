const signUpForm = $('.sign-up-form'),
    signUpUsernameGroup = $('.username-group'),
    signUpPasswordGroup = $('.password-group'),
    signUpPasswordGroups = $('.password-group, .password-group-II'),
    signUpPasswordGroupII = $('.password-group-II'),
    signUpUserName = $('.username-group input'),
    signUpPassWord = $('.password-group input'),
    signUpPassWordII = $('.password-group-II input'),
    signUpBtn = $('.sign-up-form  :submit'),
    signUpfirstnameGroup = $('.firstname-group'),
    signUpfirstname = $('.firstname-group input'),
    signUplastnameGroup = $('.lastname-group'),
    signUplastname = $('.lastname-group input'),
    signUpemailGroup = $('.email-group'),
    signUpemail = $('.email-group input'),
    signUpphone = $('.phone-group input'),
    signUpphoneGroup = $('.phone-group input, .phone-group select'),
    signUpeye = $('.eye i'),
    signUpeyeBtn = $('.eye');

$('.country-codes').on('change',function () { 
    let select = $(this)
    select.removeClass('false')
    sessionStorage.setItem('phoneCode', select.val())
    signUpphone.trigger('focus').val(()=> {
        return select.val()
    })
    signUpphone.removeClass('true').addClass('active')
    $('.clear-phone').fadeIn('fast')
});

//check if phone field is empty
$(document).on('keydown', (e) => {
    if (e.keyCode == 8 && signUpphone.is(':focus') && signUpphone.val().length < 6) {
        e.preventDefault()
    }
})    

//require number country code
$(document).on('ready',function () {
    signUpphone.val('')
});

signUpphone.on('keypress',function (e) {
    var charCode = (e.which) ? e.which : event.keyCode
    if (String.fromCharCode(charCode).match(/[^0-9]/g)) {
        return false
    }
})

function clearPhone(e) {
    signUpphone.addClass('true').val('')
    $('.clear-phone').fadeOut('fast')
    $('.country-codes').val('')
}
/*\
signUpphoneCover.on('click', () => {
    if (signUpphone.hasClass('true') && $('.country-codes').hasClass('false')) {
        console.log('code false, phone still disabled')
        $('.country-codes').addClass('fail')
        $('.phone-group').find('span').fadeIn('fast').html('Please choose your country code')
        $('.country-codes').focus()
    } else if (signUpphone.hasClass('true')) {
        console.log('code true, phone still disabled')
    }
})
*/
//get input values
var sessionemail = sessionStorage.getItem('email'),
    sessionusername = sessionStorage.getItem('username');

//check for input values
if (sessionemail) {
    signUpemail.val(sessionemail)
    signUpUserName.val(sessionusername)
}

//check for errors and display
var alertType = errType,
    alertMsg = alertmsg;
$(document).ready(function () {
    signUpphone.val('')
    if (alertType == 'pwdsErr') {
        alertBox.fadeIn('fast').addClass('fail-box').find('span').fadeIn('fast').html(alertMsg)
        signUpPassWord.addClass('fail')
        signUpPassWordII.addClass('fail')
        signUpeye.removeClass('true')
        signUpeye.removeClass('fa-eye')
        signUpeye.addClass('fa-eye-slash')
        signUpPasswordGroups.find('input').attr('type', 'text')
        setTimeout(() => {
            signUpBtn.val('sign up').attr('disabled', false)
        }, 100);
    } else if (alertType == 'usernameErr') {
        alertBox.fadeIn('fast').addClass('fail-box').find('span').fadeIn('fast').html(alertMsg)
        setTimeout(() => {
            alertBox.fadeOut('fast')
        }, 2500);
        signUpUserName.addClass('fail')
        setTimeout(() => {              
            signUpBtn.val('sign up').attr('disabled', false)
        }, 100);
    } else if (alertType == 'emailErr') {
        alertBox.fadeIn('fast').addClass('fail-box').find('span').fadeIn('fast').html(alertMsg)
        setTimeout(() => {
            alertBox.fadeOut('fast')
        }, 2500);
        signUpemail.addClass('fail')
        setTimeout(() => {              
            signUpBtn.val('sign up').attr('disabled', false)
        }, 100);
    } else if (alertType == 'phoneErr') {
        alertBox.fadeIn('fast').addClass('fail-box').find('span').fadeIn('fast').html(alertMsg)
        setTimeout(() => {
            alertBox.fadeOut('fast')
        }, 2500);
        signUpphoneGroup.addClass('fail')
        setTimeout(() => {              
            signUpBtn.val('sign up').attr('disabled', false)
        }, 100);
    } else if (alertType == 'Err') {
        alertBox.fadeIn('fast').addClass('fail-box').find('span').fadeIn('fast').html(alertMsg)
        setTimeout(() => {
            alertBox.fadeOut('fast')
        }, 2500);
        setTimeout(() => {              
            signUpBtn.val('sign up').attr('disabled', false)
        }, 100);
    }
});
//clear up error warnings when user is on focus
//console.log(signUpPassWord.val())

signUpfirstname.on('focus',function (e) { 
    signUpfirstname.removeClass('fail')
    signUpfirstnameGroup.find('span').fadeOut('slow')
});
signUplastname.on('focus',function (e) { 
    signUplastname.removeClass('fail')
    signUplastnameGroup.find('span').fadeOut('slow')
});
signUpemail.on('focus',function (e) { 
    signUpemail.removeClass('fail')
    signUpemailGroup.find('span').fadeOut('slow')
});
signUpUserName.on('focus',function (e) { 
    signUpUserName.removeClass('fail')
    signUpUsernameGroup.find('span').fadeOut('slow')
});
signUpPassWord.on('focus',function (e) { 
    signUpPassWord.removeClass('fail')
    signUpPasswordGroup.find('span').fadeOut('slow')
});
signUpPassWordII.on('focus',function (e) { 
    signUpPassWordII.removeClass('fail')
    signUpPasswordGroupII.find('span').fadeOut('slow')
});
signUpphone.on('focus',function (e) { 
    signUpphone.removeClass('fail')
    $('.phone-group').find('span').fadeOut('slow')
    if ($(this).hasClass('true')) {
        $('.country-codes').focus().select();
    } else {
        $('.clear-phone').fadeIn('fast')
    }
});

signUpphone.on('keyup',function (e) { 
    $('.clear-phone').fadeIn('fast')
})
signUpphone.on('blur',function (e) { 
    $('.clear-phone').fadeOut('fast')
})
$('.country-codes').on('click',function (e) { 
    if ($(this).hasClass('fail')) {
        $('.country-codes').removeClass('fail')
        $('.phone-group').find('span').fadeOut('slow')
    }
});


//iterate through the form, display error warnings
function signUpValidating(form) {
    if (signUpfirstname.val() == '') {
        signUpfirstname.addClass('fail')
        signUpfirstnameGroup.find('span').fadeIn('fast').html('Please enter your First name')
    } else if (signUplastname.val() == '') {
        signUplastname.addClass('fail')
        signUplastnameGroup.find('span').fadeIn('fast').html('Please enter your Last name')
    } else if (signUpemail.val() == '') {
        signUpemail.addClass('fail')
        signUpemailGroup.find('span').fadeIn('fast').html('Please enter your Email')
    } else if (signUpUserName.val() == '') {
        signUpUserName.addClass('fail')
        signUpUsernameGroup.find('span').fadeIn('fast').html('Please enter your Username')
    } else if (signUpPassWord.val() == '') {
        signUpPassWord.addClass('fail')
        signUpPasswordGroup.find('span').fadeIn('fast').html('Please enter your Password')
    }else if (signUpPassWordII.val() == '') {
        signUpPassWordII.addClass('fail')
        signUpPasswordGroupII.find('span').fadeIn('fast').html('Please enter to confirm your Password')
    } else if (signUpphone.hasClass('active')) {
        if (signUpphone.val().length < 5) {
            signUpphone.addClass('fail')
            $('.phone-group').find('span').fadeIn('fast').html('Please enter your contact number')
        } else {
            submitSignup(form)
        }
        console.log('logger')
    } else if (signUpemail.val() !== '' && signUpUserName.val() !== '' && signUpPassWord.val() !== '' && signUpPassWordII.val() !== '') {
        //submit form
        submitSignup(form)
    }
}

function submitSignup(form) {
    form.submit();
}

//submit the form
signUpForm.on('submit', function (event) { 
    event.preventDefault();
    var form = this;
    signUpValidating(form);
    //save input values
    sessionStorage.setItem('email', signUpemail.val())
    sessionStorage.setItem('username', signUpUserName.val())
});

//get country codes from db
var countyCodesBox = $('.country-codes');

$(document).ready(function (e) {
    //e.preventDefault();
    $.ajax({
        method: "POST",
        url: "/country-codes",
        data: {
            request: 'country codes'
        },
        success:(result) => {
            countyCodesBoxSuccess(result)
        },
        error:(result) => {
            countyCodesBoxFail(result)
        }
    })
});


function countyCodesBoxSuccess(result) {
    var countrylist = result.map((o) => (
        o.name
    )),
        codeslist = result.map((o) => (
            o.dial_code
        ))
    const countryCollection = [].concat(...countrylist)
    //console.log(countryCollection)
    var countryshtml = $.map(countryCollection, function (code, i) {
        return ('<option value="'+codeslist[i]+'">'+code+'</option>')
    })
    let countryCodes = countryshtml.join('');
    countyCodesBox.append(countryCodes)
}

function Eye(event) {
    if (event.classList.contains('true')) {
        event.classList.remove('true')
        event.classList.remove('fa-eye')
        event.classList.add('fa-eye-slash')
        signUpPasswordGroups.find('input').attr('type', 'text')
    } else {
        event.classList.add('true')
        event.classList.add('fa-eye')
        event.classList.remove('fa-eye-slash')
        signUpPasswordGroups.find('input').attr('type', 'password')
    }
}