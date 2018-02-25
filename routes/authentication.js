/**
 * authentication.js
 * @param app - application object itself
 * @param firebase - firebase library that is required by the application
 * @param database - exports from database.js
 *
 * I am a class that handles all routes dealing with authentication
 * (e.g sign in, sign out, new user creation, etc.)
 */

module.exports = function(app, firebase, database) {
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
               .then(function(user) {
                  res.json({success: true});
               })
               .catch(function(error) {
                  console.log(error.code + ": " + error.message);
                  res.json({success: false, errorCode: error.code, errorMessage: error.message});
               })
      }

      if(credential) {
         firebase.auth().signInWithCredential(credential)
               .then(function (user) {
                  if (user.metadata.creationTime === user.metadata.lastSignInTime)
                     database.writeNewUserToDatabase(user.uid, user.displayName, user.email);
                  res.json({success: true});
               })
               .catch(function(error) {
                  console.log(error.code + ": " + error.message);
                  console.log(error.credential);
                  res.json({success: false, errorCode: error.code, errorMessage: error.message});
               });
      }
   });

   app.post("/createAccount", function(req, res) {
      var displayName = req.body.name;
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(function(user) {
               if (user.metadata.creationTime === user.metadata.lastSignInTime)
                  database.writeNewUserToDatabase(user.uid, displayName, user.email);
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