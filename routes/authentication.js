/**
 * authentication.js
 * @param app - application object itself
 * @param firebase - firebase library that is required by the application
 *
 * I am a class that handles all routes dealing with authentication
 * (e.g sign in, sign out, new user creation, etc.)
 */

module.exports = function(app, firebase) {
   app.post("/authenticate", function(req, res) {
      var providerName = req.body.provider;
      var idToken = req.body.idToken;
      var credential;

      if(providerName === "google") {
         credential = new firebase.auth.GoogleAuthProvider.credential(idToken);
      }
      // else if(providerName === "twitter") {
      //    providerName = new firebase.auth.TwitterAuthProvider();
      // }
      else if(providerName === "firebase") {
         firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
               .then(function() {
                  res.redirect("/");
               })
               .catch(function(error) {
                  console.log(error.code + ": " + error.message);
               })
      }

      if(credential) {
         firebase.auth().signInWithCredential(credential)
               .catch(function(error) {
                  console.log(error.code + ": " + error.message);
                  console.log(error.credential);
               });
      }
   });

   app.post("/createAccount", function(req, res) {
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(function() {
               res.redirect("/");
            })
            .catch(function(error) {
               console.log(error.code + ": " + error.message);
               res.render("error", {message: error.message, error: error});
            })
   });

   app.get("/logout", function(req, res) {
      firebase.auth().signOut()
            .then(function () { res.redirect("/") })
            .catch(function(error) {
          console.log(error.code + ": " + error.message);
      });
   });
};