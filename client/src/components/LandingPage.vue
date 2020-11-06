<template>
  <div>
    <div class="container-flex">
      <div class="logo">
        <img
          src="../../img/clip-hardworking-man.png"
          alt="kanban logo"
          style="margin: 8em"
        />
      </div>
      <Login
        v-if="login == true"
        @isLogin="isLogin"
        @logingIn="logingIn"
        @googleLogin="googleLogin"
        @googleLoginError="googleLoginError"
        :error="error"
      ></Login>
      <Register
        v-if="login == false"
        @register="register"
        @isLogin="isLogin"
        :error="error"
      ></Register>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
export default {
  name: "LandingPage",
  components: {
    Login,
    Register,
  },
  props: ["login", "error"],
  methods: {
    register(payload) {
      this.$emit("register", payload);
    },
    isLogin(payload) {
      this.$emit("isLogin", payload);
    },
    logingIn(payload) {
      this.$emit("logingIn", payload);
    },
    googleLogin(token) {
      this.$emit("googleLogin", token);
    },
    googleLoginError(error) {
      this.$emit("googleLoginError", error);
    },
  },
};
</script>

<style>
</style>