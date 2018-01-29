var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'production';
var isDevelopmentEnv = (env === 'development');
if (isDevelopmentEnv) {
   require('dotenv').config({path: './config/dev.env'});
}
else {
   require('dotenv').config({path: 'prod.env'});
}

// setup ===================================
var port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
// app.locals.routes = require('./routes/routes');

// configuration ===========================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes ==================================
require('./routes/routes')(app);

// error handling ==========================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// will print stacktrace
if (isDevelopmentEnv) {
   app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error: err
      });
      // res.render('jumbotron', {title: 'Test Jumbotron'});
   });
}

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
      message: err.message,
      error: {}
   });
});


//launch ===================================
app.listen(port);
console.log("Listening on port %s", port);
