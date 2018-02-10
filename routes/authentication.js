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
                  res.render("main", {title: "The Retreat"});
               })
               .catch(function(error) {
                  console.log(error.code + ": " + error.message);
               })
      }

      if(credential) {
         firebase.auth().signInWithCredential(credential)
             .then(function (response) {
                 res.redirect("/");
             })
               .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user"s account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
               });
      }
   });

   app.post("/newUser", function(req, res) {
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(function() {
               res.render("main", {title: "The Retreat"});
            })
            .catch(function(error) {
               console.log(error.code + ": " + error.message);
            })
   });

   app.get("/logout", function(req, res) {
      firebase.auth().signOut().catch(function(error) {
          console.log(error.code + ": " + error.message);
      });
   });
};