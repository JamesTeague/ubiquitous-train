// TODO: Find out if these files can be parameterized and pulled from a config file.
var config = {
   apiKey: "AIzaSyDAdnIYz5zUjyeLkefLfLZhGtFaM4UJ6SE",
   authDomain: "the-retreat-88d81.firebaseapp.com",
   databaseURL: "https://the-retreat-88d81.firebaseio.com",
   projectId: "the-retreat-88d81",
   storageBucket: "the-retreat-88d81.appspot.com",
   messagingSenderId: "336154349739"
};
firebase.initializeApp(config);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
   callbacks: {
      signInSuccess: function(currentUser, credential, redirectUrl) {
         // User successfully signed in.
         // Return type determines whether we continue the redirect automatically
         // or whether we leave that to developer to handle.
         return true;
      },
      uiShown: function() {
         // The widget is rendered.
         // Hide the loader.
         document.getElementById('loader').style.display = 'none';
      }
   },
   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
   signInFlow: 'popup',
   // TODO: Change this url to the actual index page, may need to be built.
   signInSuccessUrl: '/index',
   signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID
   ]
   // Terms of service url.
   // tosUrl: '<your-tos-url>'
};
ui.start('#firebaseui-auth-container', uiConfig);