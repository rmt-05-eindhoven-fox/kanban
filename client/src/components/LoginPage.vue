<template>
  <section class="container-fluid" id="login">
    <div class="container">
      <div class="row align-items-center" style="height: 100vh">
        <div class="col-7">
          <img class="w-100" src="../assets/image.svg" /><br />
          <h1>Start manage your work using Kanban</h1>
        </div>
        <div class="col-5 p-5 shadow rounded bg-light">
          <h1>Login</h1>
          <hr />
          <br />
          <div class="error-message"></div>
          <form @submit.prevent="login" id="login">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="email"
                type="email"
                id="login-email"
                class="form-control"
                autocomplete="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="password"
                type="password"
                id="login-password"
                class="form-control"
                autocomplete="current-password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button
            ><br /><br />
            <span class="btn btn-link" @click="toRegister"
              >Doesn't have an account? Register now!</span
            >
          </form>
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess" 
          ></GoogleLogin>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleLogin from "vue-google-login";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "826714744713-bgfnlofqm670dh9c00pj6ucagl5n3ram.apps.googleusercontent.com",
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    toRegister() {
      let payload = {
        pageName: "register-page",
      };
      this.$emit("changePage", payload.pageName);
    },
    onSuccess(googleUser) {
      const payload = {
        email: googleUser.getBasicProfile().$t,
        google_access_token:googleUser.wc.id_token
      }
    this.$emit("googleLogin", payload )
      // This only gets the user information: id, name, imageUrl and email
    },
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.clearForm();
      this.$emit("login", payload);
    },
    clearForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style>
</style>