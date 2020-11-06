<template>
  <div class="menu">
    <div class="shadow-lg bg-white rounded p-4" style="width: 30em">
      <h1 class="text-center">WELCOME TO KANBAN APP</h1>
      <h2 class="text-center">Login</h2>
      <div v-if="error" class="alert alert-danger text-center" role="alert">
        <p v-for="(er, i) in error" :key="i">{{ er }}</p>
      </div>
      <form v-on:submit.prevent="logingIn">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input
            v-model="email"
            type=" email"
            id="login-email"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input
            v-model="password"
            type="password"
            id="login-password"
            class="form-control"
          />
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary text-center">
            Login
          </button>
        </div>
      </form>
      <p class="mt-3">
        Don't have an account?
        <span v-on:click="isLogin" type="button" class="text-primary"
          >Register</span
        >
      </p>
      <hr />
      <button v-google-signin-button="clientId" class="google-signin-button">
        Continue with Google
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: "",
      clientId:
        "61384633864-luj2mcnugnakt55v9u8c8p8f7l96u6j3.apps.googleusercontent.com",
    };
  },
  props: ["error"],
  methods: {
    isLogin() {
      let login = false;
      this.$emit("isLogin", login);
    },
    logingIn() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("logingIn", payload);
    },
    OnGoogleAuthSuccess(idToken) {
      this.$emit("googleLogin", idToken);
    },
    OnGoogleAuthFail(error) {
      this.$emit("googleLoginError", error);
    },
  },
};
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