//env vars
require("dotenv").config();

//mongofb connection
require("../configurations/mongo-connection")

//Express
const express = require('express');

//prerequisites
var bodyParser = require('body-parser');
var http = require('http');
var createHttpError = require("http-errors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var compression = require('compression');

//config vars
const db = require('../configurations/env-vars-connection').get(process.env.NODE_ENV)

const app = express();

//routes
var indexRouter = require('../routes/index')
app.use('/', indexRouter);

//set port
const port = db.PORT;

//view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist/'));
app.use(express.static('node_modules/jquery/dist'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createHttpError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error!' });
});

/** Create HTTP server. */
const server = http.createServer(app);
server.listen(port);
/** Event listener for HTTP server "listening" event. */
//Start Server
server.on("listening", () => {
    console.log(`App listening on port::${port}`)
});