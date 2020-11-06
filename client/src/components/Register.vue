<template>
  <div class="menu">
    <div class="shadow-lg bg-white rounded p-4" style="width: 30em">
      <h1 class="text-center">WELCOME TO KANBAN APP</h1>
      <h2 class="text-center">Register</h2>
      <div v-if="error" class="alert alert-danger text-center" role="alert">
        <p v-for="(er, i) in error" :key="i">{{ er }}</p>
      </div>
      <form v-on:submit.prevent="register">
        <div class="form-group">
          <label for="register-email">Email</label>
          <input
            v-model="email"
            type=" email"
            id="register-email"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="register-password">Password</label>
          <input
            v-model="password"
            type="password"
            id="register-password"
            class="form-control"
          />
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary text-center">
            Register
          </button>
        </div>
      </form>
      <p class="mt-3">
        Already Have Account?
        <span v-on:click="isLogin" type="button" class="text-primary"
          >Login</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "register-page",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  props: ["error"],
  methods: {
    register() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("register", payload);
    },
    isLogin() {
      let login = true;
      this.$emit("isLogin", login);
    },
  },
};
</script>

<style>
</style>