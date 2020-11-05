<template>
  <!--  REGISTER  -->
  <!-- <selection class="container" id="register"> -->
    <div class="container row justify-content-center">
      <div class="col-4">
        <h2>Register</h2><br>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              class="form-control"
              type="text"
              id="register-email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              class="form-control"
              type="password"
              id="register-password">
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
          <a @click.prevent="login" class="btn btn-primary">Back</a>
        </form>
      </div>
    </div>
  <!-- </selection> -->
  <!--  END REGISTER  -->
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$emit('changePage', 'login')
    },
    register () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$emit('register', user)
    }
  }
}
</script>

<style>

</style>