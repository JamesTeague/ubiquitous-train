var firebase = require("firebase");

exports.writeNewUserToDatabase = function(userId, name, email) {
   firebase.database().ref("users/" + userId).set({
      username: name,
      email: email
   });
};

exports.getBids = function () {
   return firebase.database().ref("bids").once("value");
};

exports.getCityById = function (aCityId) {
  return firebase.database().ref("cities/" + aCityId).once("value");
};