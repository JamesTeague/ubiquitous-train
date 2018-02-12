var express = require("express");
var firebase = require("firebase");
var app = express();
var env = process.env.NODE_ENV || "production";
var isDevelopmentEnv = (env === "development");
if (isDevelopmentEnv) {
   require("dotenv").config({path: "./config/dev.env"});
}
else {
   require("dotenv").config({path: "prod.env"});
}

// setup ===================================
var port = process.env.PORT || 3000;
var path = require("path");
var bodyParser = require("body-parser");
var config = {
   apiKey: process.env.FIREBASE_API_KEY,
   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
   databaseURL: process.env.FIREBASE_DB_URL,
   projectId: process.env.FIREBASE_PROJECT_ID,
   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// configuration ===========================
firebase.initializeApp(config);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.enable("trust proxy");
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.locals.authenticated = function(req, res, next) {
   if(firebase.auth().currentUser) return next();
   else res.redirect("/login");
};
app.locals.unauthenticated = function (req, res, next) {
   if(!firebase.auth().currentUser) return next();
   else res.redirect("/");
};

// routes ==================================
var routes = require("./routes/routes");
require("./routes/authentication")(app, firebase);
app.get("/login", app.locals.unauthenticated, routes.login);
app.get("/", app.locals.authenticated, routes.home);
app.get("/signUp", app.locals.unauthenticated, routes.signUp);

// error handling ==========================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error("Not Found");
   err.status = 404;
   next(err);
});

// will print stacktrace
if (isDevelopmentEnv) {
   app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
         message: err.message,
         error: err
      });
   });
}

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render("error", {
      message: err.message,
      error: {}
   });
});


//launch ===================================
app.listen(port);
console.log("Listening on port %s", port);
module.exports = app;
