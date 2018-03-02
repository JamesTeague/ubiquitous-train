var database = require("../public/scripts/database");
var util = require("../public/scripts/util");

exports.login = function(req, res) {
   res.render("login", {title: "Retreat Sign In", loggedIn: false});
};

exports.home = function(req, res) {
   var bids = [];
   var promises = [];
   database.getBids().then(function(snapshot){
      snapshot.forEach(function (bid) {
         promises.push(database.getCityById(bid.val().cityId));
      });
      Promise.all(promises).then(function(cities) {
         cities.forEach(function (city) {
            bids.push(city.val());
         });
         res.render("main", {title: "The Retreat", loggedIn: true, bids: util.sortJsonArrayByKey(bids, "name")});
      });
   });
};

exports.signUp = function(req, res) {
   res.render('signup', {title: "The Retreat Sign Up", loggedIn: false});
};