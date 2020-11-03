const SERVER = 'http://localhost:3000'

function onSignIn(googleUser) {


    let access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: SERVER + '/googleLogin',
        data: {
            access_token
        }
    })
        .done(res => {
            const access_token = res.access_token
            localStorage.setItem('access_token', access_token)
            // $('#content').show()
            // $('#login').hide()
            // $('#register').hide()
            // $('#edit-content').hide()

            // $('#login-email').val('')
            // $('#login-password').val('')

            // fetchTask()

        })
        .fail(err => {
            console.log(err)
        })
  }


  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }