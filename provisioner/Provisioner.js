function Provisioner(firebaseRef) {
   this.firebase = firebaseRef;
   this.uuidFactory = require("uuid");
   this.userList = [];
   this.bidList = [];

   // initialize listeners
   var me = this;
   this.firebase.database().ref("cities").on("child_added", function (snapshot) {
      me.addBid(snapshot.key, me.userList[Math.floor(Math.random()*me.userList.length)]);
   });
}

Provisioner.prototype.dropNodes = function () {
   console.log("Dropping nodes...");
   var promises = [
      this.firebase.database().ref("bids").remove(),
      this.firebase.database().ref("cities").remove(),
      this.firebase.database().ref("votes").remove()
   ];

   return Promise.all(promises);
};

Provisioner.prototype.addBid = function (aCityId, aUserId) {
   console.log("Adding bid for " + aCityId);
   var bidUUID = this.uuidFactory.v4();
   this.bidList.push(bidUUID);
   return this.firebase.database().ref("bids/" + bidUUID).set({
      cityId: aCityId,
      userId: aUserId
   });
};

Provisioner.prototype.addCity = function (aName, aState, aCountry) {
   console.log("Adding city: " + aName);
   return this.firebase.database().ref("cities/" + this.uuidFactory.v4()).set({
      name: aName,
      state: aState,
      country: aCountry
   });
};

Provisioner.prototype.addVote = function (aUserId, aPoints, aBidId) {
   console.log("Adding vote for " + aBidId);
   this.firebase.database().ref("votes/" + this.uuidFactory.v4()).set({
      userId: aUserId,
      points: aPoints,
      bidId: aBidId
   });
};

Provisioner.prototype.addVotes = function () {
   var me = this;
   var maxPoints = 10;
   this.userList.forEach(function (userId) {
      var pointsLeft = maxPoints;
      while (pointsLeft > 0) {
         var votingPoints = getRandomVoteNumber(pointsLeft);
         me.addVote(userId, votingPoints, me.bidList[Math.floor(Math.random()*me.bidList.length)]);
         pointsLeft -= votingPoints;
      }
   });

};

Provisioner.prototype.addCities = function () {
   console.log("Adding Cities...");
   var promises =[
      this.addCity("Atlanta", "GA", "USA"),
      this.addCity("Charleston", "SC", "USA"),
      this.addCity("Cancun", null, "MEX"),
      this.addCity("Bahamas", null, "JAM"),
      this.addCity("Washington DC", null, "USA"),
      this.addCity("Las Vegas", "NV", "USA"),
      this.addCity("Memphis", "TN", "USA"),
      this.addCity("San Francisco", "CA", "USA"),
      this.addCity("New Orleans", "LA", "USA"),
      this.addCity("Seattle", "WA", "USA"),
      this.addCity("Toronto", null, "CAN"),
      this.addCity("San Diego", "CA", "USA"),
      this.addCity("Charlotte", "NC", "USA"),
      this.addCity("Miami", "FL", "USA"),
      this.addCity("New York City", "NY", "USA"),
      this.addCity("Santa Rosa Beach", "FL", "USA"),
      this.addCity("Mexico City", null, "MEX"),
      this.addCity("Outer Banks", "NC", "USA"),
      this.addCity("Santa Barbara", "CA", "USA"),
      this.addCity("Los Angeles", "CA", "USA")
   ];
   return Promise.all(promises);
};

Provisioner.prototype.addUsers = function () {
   var me = this;
   var ref = me.firebase.database().ref("users");
   if(ref) {
      ref.once("value").then(function(snapshot){
         console.log("Adding Users to Provisioner...");
         snapshot.forEach(function (user) {
            me.userList.push(user.key);
         });
         return snapshot.val();

      },function (errorObject) {
         console.log("The read failed: " + errorObject.code + " " + errorObject.message);
      })
   }
};

Provisioner.prototype.provisionDatabase = function () {
   var me = this;
   var promises = [];
   promises.push(this.dropNodes(), this.addUsers());
   Promise.all(promises).then(function(){
      me.addCities().then(me.addVotes()).then(function(){
         console.log("BUILD SUCCESSFUL");
      });
   });
};

function getRandomVoteNumber(aMaxNumber) {
   return aMaxNumber === 1 ? 1 : Math.floor(Math.random() * aMaxNumber);
}

module.exports = Provisioner;