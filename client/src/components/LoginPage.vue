<template>
  <section class="container mt-5" id="login-page">
    <div>
      <h1 class="text-center">
        KANBAN
      </h1>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-8">
        <div class="p-5">
          <img src="../../assets/login.svg" alt="login" class="img-fluid">
        </div>
      </div>
      <div class="col-4">
        <h3 class="text-center">Login</h3>
        <br>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="login-email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="login-email" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input v-model="password" type="password" class="form-control" id="login-password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <a v-on:click.prevent="changePage('register-page')" class="card-link mt-5" href="#">Don't have account? Register</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    changePage(name) {
      this.$emit('changePage', name)
    },
    login(){
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$emit('login', payload)
    }
  }
}
</script>

<style>

</style>