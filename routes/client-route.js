const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const control = require('../controllers/client-index')
const request = require('../controllers/client-requests')
router
    .get('/', control.getHome)
    .get('/login', control.getLogin)
    .get('/logout', control.logout)
    .get('/signup', control.getSignup)
    .post('/register-client', request.register)
    .get('/user-login-options', control.loginOptions)
    .post('/country-codes', request.getCountryCodes)
    .get('/verify-email', control.getEmailVerification)
    .post('/verify-email-pin', request.verifyEmailpin)
module.exports = router;