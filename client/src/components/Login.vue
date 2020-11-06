<template>
  <!--  LOGIN  -->
  <!-- <selection class="container" id="login"> -->
    <div class="row justify-content-center">
      <div class="col-4">
        <h2>Login</h2><br>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              class="form-control"
              type="text"
              id="login-email"
              autocomplete="email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              class="form-control"
              type="password"
              id="login-password"
              autocomplete="current-password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <a @click.prevent="register" id="btn-register" class="btn btn-primary">Register</a>
        </form>
        <!-- google signin button -->
        <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
      </div>
    </div>
  <!-- </selection> -->
  <!--  END LOGIN  -->
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      clientId: '69846108946-h5k99nvubldnpujes9bhbtsesk35bu0r.apps.googleusercontent.com'
    }
  },
  methods: {
    login () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$emit('login', user)
    },
    register () {
      this.$emit('changePage', 'register')
    },
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      // Receive the idToken and make your magic with the backend
      this.$emit('googleLogin', idToken)
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>