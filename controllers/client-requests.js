const Client = require('../models/client-users')
const processMsgs = require('../middlewares/process-msgs')
const CountryCodes = require('../models/country-codes');
const randomString = require('crypto-random-string')
const app = require('../server/index')

module.exports = {
    register: async function (req,res) {
        const OTP = randomString(6),
            newClient = new Client({
                email: req.body.email,
                username: req.body.username,
                phone: req.body.phone,
                password: req.body.password,
                passwordII: req.body.passwordII,
                verified: false,
                otp: OTP,
            }),
            saveNewClient = function () {
                newClient.save((err, doc) => {
                    if(err) {
                        console.log(err)
                        return res.status(500).send({alert: processMsgs.serverErr, errType: 'Err'});
                    } else if (doc) {                                                
                        doc.generateOtp((err, user) => {
                            if (err) {
                                console.log(err)
                                return res.status(500).send({alert: ErrorMsgs.serverErr, errType:'Err'})
                            }
                        
                            res.render('verify-email',{title: 'Email Verification',email: user.email, msg: processMsgs.verEmail});
                        })
                    }
                })
            }
        
        if (newClient.password !== newClient.passwordII) return res.status(401).render('client-signup',{title:'Sign up', alert: processMsgs.pwdsErr, errType: 'pwdsErr'})

        //check for email
        Client.emailCheck(newClient.email, (err, user) => {
            //check if user is verified 
            if (user) {
                if (user.verified == 'true') {          
                    //if verified, request for another email
                    //console.log('1.user verified: ' + user.verified)   
                    return res.status(401).render('client-signup',{title:'Sign up', alert: processMsgs.emailErr, errType: 'emailErr'})
                } else if (err) {
                    console.log(err)
                    return res.status(500).send({alert: processMsgs.serverErr, errType: 'Err'})
                } else if (user.verified == 'false') {
                    //if user has registered before and is not verified, then update user & redirect to email verification page                
                    user.username = newClient.username;
                    user.phone = newClient.phone;
                    user.password = newClient.password;
                    function setOtp() {
                        user.otp = OTP;
                        console.log(user.otp)
                    }
                    let setOtp_once = app.once(setOtp)
                    setOtp_once();
                    setOtp_once();
                    user.save((err, userUpdated) => {
                        if(err) {
                            console.log(err)
                            return res.status(500).send({alert: processMsgs.serverErr, errType: 'Err'});
                        } else if (userUpdated) {                                                
                            res.render('verify-email',{title: 'Email Verification',email: user.email, msg: processMsgs.verEmail});
                        }
                    })
                }
            } else if (!user) {
                //check for username & if user hasn't registered before
                Client.usernameCheck(newClient.username, (err, username) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send({alert: processMsgs.serverErr, errType: 'Err'})
                    } else if (username) {
                        return res.status(401).render('client-signup',{title:'Sign up', alert: processMsgs.usernameErr, errType: 'usernameErr'})
                    } else if (!username) {
                        //if user wishes to save phone number, check if similar number exists. If not save without phone
                        if (newClient.phone) {
                            Client.phoneCheck(newClient.phone, (err, phone) => {
                                if (err) {
                                    console.log(err)
                                    return res.status(401).render('client-signup',{title:'Sign up', alert: processMsgs.serverErr, errType: 'Err'})
                                } else if (phone) {
                                    return res.status(401).render('client-signup',{title:'Sign up', alert: processMsgs.phoneErr, errType: 'phoneErr'})
                                } else if (!phone) {
                                    saveNewClient()
                                }
                            })
                        } else {
                            saveNewClient()
                        }
                    }
                })
            }
        })
    },
    getCountryCodes: async function (req, res) {
        CountryCodes.getCountryCodes({}, (err, country) => {
            if (err) {
                console.log(err)
                return res.status(500).send({alert: processMsgs.serverErr, errType: 'Err'});
            }

            //console.log(country)
            res.status(200).send(country);
        });
    },
    verifyEmailpin: async function (req, res) {
        let user = req.body,
        err;
        if (err) {
            return res.status(500).send({alert: processMsgs.serverErr, errType: 'Err'});
        } else if (!user.pin) {
            res.status(200).send({alert: processMsgs.newUserSuccess})
        } else if (user.pin) {
            res.status(401).send({alert: processMsgs.pinErr, errType: 'pinErr'})
        }
    }
}