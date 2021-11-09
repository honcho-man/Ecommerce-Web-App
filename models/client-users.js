const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    config = require('../configurations/env-vars-connection').get(process.env.NODE_ENV),
    salt = 10,
    crypto = require('crypto'),
    randomString = require('crypto-random-string');

const clientUserSchema = mongoose.Schema({
        firstname: {
            type: String,
            required: false,
        },
        lastname: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
            maxlength: 15,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        passwordII: {
            type: String,
            required: true,
            minlength: 8,
        },
        token: {
            type: String,
        },
        newUserToken: {
            type: String,
        },
        verified: {
            type: String,
        },
        otp: {
            type: String,
            minlength: 6,
        }
    },
    {
        timeStamps: true,
        collection: 'client_users'
    });   

clientUserSchema.pre('save', function (next){
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(salt, (err, salt)=>{
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash)=>{
                if (err) return(err);
                user.password = hash;
                user.passwordII = hash;
                next();
            })
        })
    } else {
        next()
    }
})

//compare passwords (i.e password & confirm password)
clientUserSchema.methods.comparePasswords = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

//generate token after sign up

//generate token for login
clientUserSchema.methods.generateNewUserToken = function (cb) {
    let user = this,
        //convert user id & username string to token
        newUserToken = jwt.sign(user._id.toHexString(), config.NEWSECRET);
        //set token
        user.newUserToken = newUserToken;
        //save changes
        user.save((err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
}

//find new user by sign up token
clientUserSchema.statics.findNewUserByToken = function (newUserToken, cb) {    
    let user = this;
    //reconvert token back to user id & username and verify
    jwt.verify(newUserToken, config.NEWSECRET, function(err, decode) {
        //find by id and newUserToken
        user.findOne({'_id': decode, 'newUserToken': newUserToken}, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

//delete new user sign up token
clientUserSchema.methods.deleteNewUserToken = function (newUserToken, cb) {
    let user = this;

    user.updateOne({$unset: {newUserToken: 1}}, function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

//generate token for login
clientUserSchema.methods.generateToken = function (cb) {
    let user = this,
        //convert user id & secret string to token
        token = jwt.sign(user._id.toHexString(), config.SECRET);
        //set token
        user.token = token;
        //save changes
        user.save(function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
}

//find user by token (i.e validate user)
clientUserSchema.statics.findByToken = function (token, cb) {
    let user = this;
    //reconvert token back to user id & secret and verify
    jwt.verify(token, config.SECRET, function(err, decode) {
        //find by id and token
        user.findOne({'_id': decode, 'token': token}, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

//delete login token
clientUserSchema.methods.deleteToken = function (token, cb) {
    let user = this;

    user.updateOne({$unset: {token: 1}}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

//find user by id
clientUserSchema.statics.idCheck = function (id, cb) {
    let user = this;

    user.findById(id, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

//find user by email
clientUserSchema.statics.emailCheck = function (email, cb) {
    let user = this;

    user.findOne({email: email}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}


//find user by username
clientUserSchema.statics.usernameCheck = function (username, cb) {
    let user = this;

    user.findOne({username: username}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}



//find user by phone
clientUserSchema.statics.phoneCheck = function (phone, cb) {
    let user = this;

    user.findOne({phone: phone}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

//generate token for login
clientUserSchema.methods.generateOtp = function (cb) {
    let user = this,
        //generate string for otp
        otp = randomString(6);
        //set otp
        user.otp = otp;
        //save changes
        user.save(function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
}

//find user by otp (i.e user verification)
clientUserSchema.statics.findByOtp = function (otp, cb) {
    let user = this;
    
    user.findOne({'otp': otp}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

//delete login otp
clientUserSchema.methods.deleteOtp = function (otp, cb) {
    let user = this;

    user.updateOne({$unset: {otp: 1}}, (err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

clientUserSchema.methods.generateJwt = function () {
    let today = new Date(),
        expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        username: this.username
    }

    return jwt.sign(payload, config.SECRET, {
        expiresIn: parseInt(expiryDate.getTime() / 1000, 10)
    });
}

module.exports = mongoose.model('Client', clientUserSchema)