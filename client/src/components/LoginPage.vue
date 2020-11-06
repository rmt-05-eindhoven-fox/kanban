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
          <div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
        <div>
          <button v-google-signin-button="clientId" class=" g-signin2"> Continue with Google</button>
          <br>
          <a v-on:click.prevent="changePage('register-page')" class="card-link mt-5" href="#">Don't have account? Register</a>
        </div>
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
      password: '',
      clientId: '1027912888456-htp09kcf70b7po8fsl19v70u6l8d6ujh.apps.googleusercontent.com'
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
    },
    OnGoogleAuthSuccess (idToken) {
      // console.log(idToken, 'mantul')
      this.$emit('OnGoogleAuthSuccess', idToken)
    },
    OnGoogleAuthFail (error) {
      // console.log(error, 'err')
      this.$emit('OnGoogleAuthFail', error)
    }
  }
}
</script>

<style>
/* * {
  background-image: url('../../assets/login-wave.svg');
} */
.google-signin-button {
  background-color: transparent;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>