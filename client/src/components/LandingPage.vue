<template>
  <div>
      <div 
        v-if="page === 'register'"
        class="container d-flex justify-content-center">
        <form  @submit.prevent="register">
          <h1>Register</h1>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
              type="email" 
              class="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              placeholder="Enter email"
              v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="exampleInputPassword1" 
              placeholder="Password"
              v-model="password">
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button class="btn btn-secondary" v-on:click.prevent="changeSection('login')">Login</button>
          </div>
        </form>
      </div>
      
      <div 
        v-else-if="page === 'login'"
        class="container d-flex justify-content-center">
        <form  @submit.prevent="login">
          <h1>Login</h1>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button class="btn btn-secondary" @click.prevent="changeSection('register')">Register</button>
          </div>
        </form>
      </div>

      <div  class="container d-flex justify-content-center">
        <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
      </div>
  
    </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data: function() {
    return {
      page: 'login',
      email: '',
      password: '',
      clientId: '247567052940-achnlp6p8btmuka5u98n1thu5gsd9ds7.apps.googleusercontent.com'
    }
  },
  methods: {
    changeSection(name) {
      this.page = name
    },
    register() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.email = ''
      this.password = ''

      this.$emit('register', payload)
    },
    login() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.email = ''
      this.password = ''

      this.$emit('login', payload)
    },
    OnGoogleAuthSuccess (idToken) {
      // console.log("idToken", idToken)
      // Receive the idToken and make your magic with the backend
      this.$emit('login', idToken)
    },
    OnGoogleAuthFail (error) {
      console.log("error", error)
    }
  }
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: #194b52;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>