<template>
    <section id="login" class="kanban-login">
      <div class="overlay">
        <div class="wrapper">
          <div class="form-section">
            <div class="logo">
              <div class="brand-logo">Kanban App</div>
            </div>
            <br>
            <h3>Login</h3>
            <br>
              <form @submit.prevent="login" class="signin-form">
                <div class="form-input">
                  <input v-model="email" type="text" name="Username" placeholder="Email" required="" autofocus>
                </div>
                <div class="form-input">
                  <input v-model="password" type="password" name="password" placeholder="Password" required="">
                </div>
                <button type="submit" class="btn btn-primary theme-button mt-4">Log in</button>
              </form>
              <br>
              <!-- >>>>>>>>>>>   GOOGLE BUTTON    <<<<<<<<<<<<< -->
              <!-- <center><button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button></center> -->
              <center><div v-google-signin-button="clientId" class='google-signin-button'>
                <div class=content-wrapper>
                    <div class='logo-wrapper'>
                        <img src='https://developers.google.com/identity/images/g-logo.png'>
                    </div>
                    <span class='text-container'>
                      <span>Log in with Google</span>
                    </span>
                  </div>
                </div>
              <br>
            <p class="signup">Don’t have account yet? <a href="" @click.prevent="toSignUp" class="signuplink">Sign Up</a></p>
          </div>
        </div>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>

      <!-- copyright -->
      <div class="copy-right">
        <p>&copy; 2020 Kanban - By Diva</p>
      </div>
      <!-- //copyright -->
    </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      clientId: '245830890681-7m9aqnpnp9rk11gob227nibflbpoi4hp.apps.googleusercontent.com'
    }
  },
  methods: {
    login(){
      let user = {
        email: this.email,
        password: this.password,
      };
      this.$emit("login", user);
    },
    toSignUp(){
      this.$emit("toSignUp")
    },
    OnGoogleAuthSuccess (idToken) {
      // console.log(idToken)
      this.$emit("loginGoogle", idToken);
    },
    OnGoogleAuthFail (error) {
      console.log(error, 'error')
    }
  }
}
</script>

<style>
*, *:before, *:after {
    box-sizing: border-box;
}

.google-signin-button {
    margin: 10px;
    display: inline-block;
    width: 240px;
    height: 50px;
    background-color: #007bff;
    color: white;
    -webkit-text-stroke-width: .3px;
    -webkit-text-stroke-color: #1500d6;
    border-radius: 1px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    transition: background-color .218s, border-color .218s, box-shadow .218s;
}

.google-signin-button:hover {
    cursor: pointer;
    -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
    box-shadow: 0 0 3px 3px #00d679;
}

.google-signin-button:active {
    background-color: #1500d6;
    transition: background-color 0.2s;
}

.google-signin-button .content-wrapper {
    height: 100%;
    width: 100%;
    border: 1px solid transparent;
}

.google-signin-button img {
    width: 18px;
    height: 18px;
}

.google-signin-button .logo-wrapper {
    padding: 15px;
    background: #fff;
    width: 48px;
    height: 100%;
    border-radius: 1px;
    display: inline-block;
}

.google-signin-button .text-container {
    font-family: Roboto,arial,sans-serif;
    font-weight: 800;
    letter-spacing: .21px;
    font-size: 16px;
    line-height: 48px;
    vertical-align: top;
    border: none;
    display: inline-block;
    text-align: center;
    width: 180px;
}
/* .google-signin-button {
  color: white;
  background-color: #00d679;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
} */
</style>