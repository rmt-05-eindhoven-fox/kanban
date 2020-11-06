<template>
  <div>
    <form class="form-signin" @submit.prevent="login">
      <label class="text-dark font-weight-bold" for="login-email">
        Email Address
      </label>
      <input
        v-model="email"
        required
        type="email"
        class="form-styling"
        placeholder="example@email.com">
      <label class="text-dark font-weight-bold" for="login-password">
        Password
      </label>
      <input v-model="password" required type="password" class="form-styling">
      <div class="row justify-content-center">
        <button type="submit" class="btn btn-success mt-2">Login</button>
      </div>
    </form>
    <Google @googleLogin="googleLogin"></Google>
  </div>
</template>

<script>
import Google from "./GoogleLogin"

export default {
  name: "Login",
  components: {
    Google
  },
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      }
      this.$emit("requestLogin", payload)
    },
    googleLogin(payload){
      this.$emit("googleLogin", payload)
    }
  },
}
</script>

<style>

</style>