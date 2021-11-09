const Client = require('../models/client-users')

const Authenticated = (req, res, next) => {
    let token = req.cookies.token;
    Client.findbyToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return  res.redirect('/login');

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {Authenticated}