<template>
  <div class="login-page">
      <div class="container-login" id="container">
        <div class="form-container sign-up-container">
          <form @submit.prevent="register">
            <h1>Create Account</h1>
            <input v-model="username" type="text" placeholder="Name" />
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form @submit.prevent="login">
            <h1>Sign in</h1>
            <div class="social-container">
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </div>
            <span>or use your account</span>
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button @click="loginSwitch" class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button @click="registerSwitch" class="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axios from 'axios'
export default {
  name: 'landingpage',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      params: {
        client_id: '907101746187-a8pivieuh6aj6ct00cg76r9qpc8tq14l.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    registerSwitch () {
      const container = document.getElementById('container')
      container.classList.add('right-panel-active')
    },
    loginSwitch () {
      const container = document.getElementById('container')
      container.classList.remove('right-panel-active')
    },
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: { email: payload.email, password: payload.password }
      })
        .then(response => {
          console.log(response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/')
          this.$store.commit('SET_EMAIL', payload.email)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register () {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.loginSwitch()
      this.$store.dispatch('register', payload)
    },
    onSuccess (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      console.log(idToken)
      this.$store.dispatch('googleLogin', idToken)
    },
    onFailure (error) {
      console.log(error)
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

<style scoped>
 body {
    margin: 0;
    /* background-image: url('../images/photo-1586936893354-362ad6ae47ba.jpg'); */
}

.login-page {
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

/* .nav {
    grid-area: nav;
    margin-left: 1px;
    margin: 0;
  } */

  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

  * {
      box-sizing: border-box;
  }
  h1 {
      font-weight: bold;
      margin: 0;
  }
  h2 {
      text-align: center;
  }

  p {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
  }

  span {
      font-size: 12px;
  }

  a {
      color: #333;
      font-size: 14px;
      text-decoration: none;
      margin: 15px 0;
  }

  button {
      border-radius: 20px;
      border: 1px solid #FF4B2B;
      background-color: #FF4B2B;
      /* color: #624FB5; */
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
  }

  button:active {
      transform: scale(0.95);
  }

  button:focus {
      outline: none;
  }

  button.ghost {
      background-color: transparent;
      border-color: #624FB5;
  }

  form {
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 50px;
      height: 100%;
      text-align: center;
  }

  input {
      background-color: #eee;
      border: none;
      padding: 12px 15px;
      margin: 8px 0;
      width: 100%;
  }
  .container-login {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25),
    0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 760px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container-login.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
  }

  .container-login.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container-login.right-panel-active .overlay-container{
    transform: translateX(-100%);
  }

  .overlay {
    background-image: url('../../images/graphic3.svg');
    background-size: 250px;
    background-repeat: no-repeat;
    background-position: 450px 250px;
    color: #624FB5;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container-login.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container-login.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
    padding-bottom: 150px;
  }

  .container-login.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid rgb(90,177,187);
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }
</style>
