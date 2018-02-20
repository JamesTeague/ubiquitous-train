function signIn(aProvider, anIdToken) {
   $.ajax({
      type: "POST",
      data : JSON.stringify({provider: aProvider, idToken: anIdToken}),
      contentType: "application/json",
      url: "/authenticate",
      success: function(data) {
         window.location.href = "/";
      }
   })
}

function onSignIn(googleUser) {
   // prevent Google OAuth from automatically logging user in on the client
   gapi.auth2.getAuthInstance()
         .disconnect()
         .then(signIn("google", googleUser.getAuthResponse().id_token));
}

function onSignInFailure(error) {
   console.log(error);
}
