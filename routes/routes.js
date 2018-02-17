exports.login = function(req, res) {
   res.render("login", {title: "Retreat Sign In", loggedIn: false});
};

exports.home = function(req, res) {
   res.render("main", {title: "The Retreat", loggedIn: true});
};

exports.signUp = function(req, res) {
   res.render('signup', {title: "The Retreat Sign Up", loggedIn: false});
};