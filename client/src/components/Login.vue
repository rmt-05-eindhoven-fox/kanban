<template>
  <!--  LOGIN  -->
  <!-- <selection class="container" id="login"> -->
    <div class="container row justify-content-center">
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
          <div class="g-signin2 mt-3" data-longtitle="true" data-onsuccess="onSignIn"></div>
        </form>
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
      password: ''
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
    }
  }
}
</script>

<style>

</style>