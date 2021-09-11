const router = require('express').Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser')
router.use(cookieParser())
var control = require('../controllers/index')
router
    .get('/', control.getHome)
module.exports = router;