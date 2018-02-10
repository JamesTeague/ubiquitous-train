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
   signIn("google", googleUser.getAuthResponse().id_token);
}

function onSignInFailure(error) {
   console.log(error);
}