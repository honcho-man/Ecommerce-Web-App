const Client = require('../models/client-users')
const processMsgs = require('../middlewares/process-msgs')

module.exports = {
    getHome: async function  (req,res) {
        res.render('client-index',{title: 'Home'});
    },
    getLogin: async function  (req,res) {
        res.render('client-login',{title: 'Login'});
    },
    getSignup: async function  (req,res) {
        let newUserToken = req.cookies.newUserToken;
        Client.findNewUserByToken(newUserToken, (err, user) => {
            if (err) {
                console.log(err)
                return res.render('login-options', {title:'Login Choices',alert: processMsgs.serverErr, errType: 'Err'});
            } else if (user) {
                res.render('login-options',{title: 'Login Choices', user: user, alert: processMsgs.signUpResume});  
            } else if (!user) {
                return res.render('client-signup', {title:'Sign up'});
            }
        })
        //res.render('client-signup',{title: 'Sign up'});
    },
    logout: async function  (req,res) {
        res.redirect('/');
    },
    loginOptions: async function  (req,res) {
        let newUserToken = req.cookies.newUserToken;
        Client.findNewUserByToken(newUserToken, (err, user) => {
            if (err) {
                console.log(err)
                return res.render('login-options', {title:'Login Choices',alert: processMsgs.serverErr, errType: 'Err'});
            } else if (user) {
                res.render('login-options',{title: 'Login Choices', user: user, alert: processMsgs.newUserSuccess});  
            } else if (!user) {
                return  res.redirect('/login');
            }
        })
    },
    getEmailVerification: async function (req, res) {
        let newUserToken = req.cookies.newUserToken;
        Client.findNewUserByToken(newUserToken, (err, user) => {
            if (err) {
                console.log(err)
                return res.render('verify-email', {title:'Email Verification', alert: processMsgs.serverErr, errType: 'Err'});
            } else if (!user) {
                res.render('verify-email',{title: 'Email Verification',email: 'email', msg: processMsgs.verEmail});
            } else if (user) {
                return  res.redirect('/login');
            }
        })        
    }
}