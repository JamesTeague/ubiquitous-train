exports.login = function(req, res) {
   res.render("login", {title: "Retreat Sign In"});
};

exports.home = function(req, res) {
   res.render("main", {title: "The Retreat"});
};

exports.signUp = function(req, res) {
   res.render('signup', {title: "The Retreat Sign Up"})
};