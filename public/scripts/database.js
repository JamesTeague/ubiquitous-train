var firebase = require("firebase");

exports.writeNewUserToDatabase = function(userId, name, email) {
   firebase.database().ref("users/" + userId).set({
      username: name,
      email: email
   });
};