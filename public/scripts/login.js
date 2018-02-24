function signIn(aProvider, anIdToken, anEmail, aPassword) {
   $.ajax({
      type: "POST",
      data : JSON.stringify({provider: aProvider, idToken: anIdToken, email: anEmail, password: aPassword}),
      contentType: "application/json",
      url: "/authenticate",
      success: function(response) {
         if(response.success) {
            window.location = "/";
         }
         else  {
            $("#loginError").html("<div class='alert alert-danger' role='alert'>"+response.errorMessage+"</div>");
         }
      }
   })
}

function onSignIn(googleUser) {
   // prevent Google OAuth from automatically logging user in on the client
   gapi.auth2.getAuthInstance()
         .disconnect()
         .then(signIn("google", googleUser.getAuthResponse().id_token));
}

function onSubmitEmailAndPassword(anEmail, aPassword) {
   signIn("firebase", null, anEmail, aPassword);
   return false;
}

function onSignInFailure(error) {
   console.log(error);
}
