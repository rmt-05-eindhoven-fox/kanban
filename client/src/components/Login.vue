<template>
  <div class="menu">
    <div class="shadow-lg bg-white rounded p-4" style="width: 30em">
      <h1 class="text-center">WELCOME TO KANBAN APP</h1>
      <h2 class="text-center">Login</h2>
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
      <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      <p class="mt-3">
        Don't have an account?
        <span v-on:click="isLogin" type="button" class="text-primary"
          >Register</span
        >
      </p>
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
    };
  },
  props: [],
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
  },
};
</script>

<style>
</style>