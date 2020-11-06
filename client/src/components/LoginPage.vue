<template>
  <section class="container-fluid" id="login">
    <div class="container">
      <div class="row align-items-center" style="height: 100vh">
        <div class="col-7">
          <img class="w-100" src="../assets/image.svg" /><br />
          <h1>Start manage your work using Kanban</h1>
        </div>
        <div class="col-5 p-5 shadow rounded bg-light">
          <h1>Login</h1>
          <hr />
          <br />
          <div class="error-message"></div>
          <form @submit.prevent="login" id="login">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="email"
                type="email"
                id="login-email"
                class="form-control"
                autocomplete="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="password"
                type="password"
                id="login-password"
                class="form-control"
                autocomplete="current-password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button
            ><br /><br />
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <br />
            <span class="btn btn-link" @click="toRegister">Doesn't have an account? Register now!</span>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name:"LoginPage",
  data(){
    return {
      email:"",
      password:""
    }
  },
  methods: {
    toRegister(){
      let payload = {
        pageName:"register-page"
      }
      this.$emit("changePage",payload.pageName)
    },
    login(){
      const payload = {
        email: this.email,
        password: this.password
      }
      this.clearForm()
      this.$emit("login", payload)
    },
    clearForm(){
      this.email = ""
      this.password = ""
    }
  }
};
</script>

<style>
</style>