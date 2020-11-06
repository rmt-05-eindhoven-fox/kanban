<template>
  <!-- LOGIN PAGE -->
  <section id="login-page" class="container mt-5 pt-5">
    <div class="row mt-5">
      <div class="col-sm-9 col-md-7 col-lg-5 m-auto">
        <div class="card card-login">
          <div class="card-body text-light">
            <h5 class="card-title text-center">LOGIN</h5>
            <form @submit.prevent="login()" class="form-login">
              <div class="form-group">
                <label for="email-login">Email Address</label>
                <input v-model="user.email_login" type="email" id="email-login" class="form-control rounded-pill p-4" placeholder="Email address" required autofocus>
              </div>
              <div class="form-group">
                <label for="password-login">Password</label>
                <input v-model="user.password_login" type="password" id="password-login" class="form-control rounded-pill p-4" placeholder="Password" required autofocus>
              </div>
              <div class="form-group">
                <label for="remember">
                  <input v-model="user.remember" type="checkbox" id="remember" name="remember" class="mr-2"> Remember Me
                </label>
              </div>
              <hr class="bg-light">
              <button class="btn btn-lg btn-primary btn-block mt-4 p-2 rounded-pill" type="submit">LOGIN</button>
              <hr class="bg-light mt-4">
            </form>
            <small class="form-text text-center">Sign in with your google account</small>
            <div class="row justify-content-center my-3">
              <button v-google-signin-button="clientId" class="google-signin-button"><i class="fab fa-google"></i> Login with Google</button>
            </div>
            <small class="form-text text-center">Don't have an account yet?<a href="#" @click.prevent="changePage('register-page')" class="text-warning"> Register now!</a></small>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="footer container text-center text-light">
        © 2020 KhanBhanBhoard by Bobby Septianto
      </div>
    </div>
  </section>
  <!-- LOGIN PAGE -->
</template>

<script>
export default {
  name: 'LoginPage',
  props: ['user'],
  components: {

  },
  data() {
    return {
    // LOGIN
      "clientId": '347714341093-c0bqlieo0hp32k7e4mkhinqlb3m5m034.apps.googleusercontent.com',
    }
  },
  methods: {
    changePage() {
      this.$emit('changePage', 'register-page');
    },
    login() {
      let payload = {
        email_login: this.user.email_login,
        password_login: this.user.password_login,
        remember: this.user.remember
      }
      this.$emit('login', payload);
    },
    OnGoogleAuthSuccess(google_access_token) {
      this.$emit('OnGoogleAuthSuccess', google_access_token);
    },
    OnGoogleAuthFail(err) {
      this.$emit('OnGoogleAuthFail', err);
    },
  }
}
</script>

<style>

</style>