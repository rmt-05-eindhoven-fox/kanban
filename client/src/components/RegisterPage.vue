<template>
  <section class="container mt-5" id="register-page">
    <div>
      <h1 class="text-center">
        KANBAN
      </h1>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-4">
        <h3 class="text-center">Register</h3>
        <br>
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <label for="register-email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="register-email" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="register-email">First name and Last name</label>
            <div class="input-group">
              <input v-model="first_name" placeholder="first name" id="register-first_name" type="text" aria-label="First name" class="form-control">
              <input v-model="last_name" placeholder="last name" id="register-last_name" type="text" aria-label="Last name" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label for="register-password">Password</label>
            <input v-model="password" type="password" class="form-control" id="register-password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <a @click.prevent="changePage('login-page')" href="#" class="card-link">Have an account? Login</a>
      </div>
      <div class="col-8">
        <div class="p-5">
          <img src="../../assets/register.svg" alt="login" class="img-fluid">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    }
  },
  methods: {
    changePage(name) {
      this.$emit('changePage', name)
    },
    register() {
      const payload = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name
      }
      this.$emit('register', payload)
    }
  }
}
</script>

<style>

</style>