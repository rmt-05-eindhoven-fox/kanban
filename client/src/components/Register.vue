<template>
  <form class="form-signup" @submit.prevent="register">
    <label class="text-dark font-weight-bold" for="register-name">
      Full Name
    </label>
    <input
      v-model="name"
      required
      type="name"
      class="form-styling"
      placeholder="e.g John Doe">
    <label class="text-dark font-weight-bold" for="register-email">
      Email Address
    </label>
    <input
      v-model="email"
      required
      type="email"
      class="form-styling"
      placeholder="example@email.com">
    <label class="text-dark font-weight-bold" for="register-password">
      Password
    </label>
    <input v-model="password" required type="password" class="form-styling">
    <div class="row justify-content-center">
      <button type="submit" class="btn btn-success mt-2">Register</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    }
  },
  methods: {
    register() {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      this.clearForm()
      this.$emit("requestRegister", payload)
    },
    clearForm() {
      this.name = ""
      this.email = ""
      this.password = ""
    }
  },
}
</script>

<style>
</style>