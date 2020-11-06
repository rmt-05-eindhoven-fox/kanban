<template>
<div class="login-page" :style="{display: active ? 'block' : 'none'}">
    <!-- LOGIN -->
  <section class="container" id="login">
    <div class="row justify-content-center mt-5">
      <div class="col-4" style="border:none"> 
        <form @submit.prevent="sendLogin"> 

          <p style="text-align: center;">Welcome to KANBAN!</p><br>

          <div class="form-group">
            <label for="login-email">Username</label>
            <input 
            v-model="loginData.username"
            class="form-control" 
            type="text" 
            id="login-email">
          </div>

          <div class="form-group">
            <label for="login-password">Password</label>
            <input 
            v-model="loginData.password"
            class="form-control" 
            type="password" 
            id="login-password">
          </div>
  
          <!-- <div class="alert alert-danger" role="alert" id="errors"></div> -->

            <div class="border border-light p-2 mb-2">
              <div class="text-center">
                <button type="submit" class="btn btn-success m-1">Login</button>
                <!-- <button type="submit" @click.prevent="showHome()" class="btn btn-success m-1">Login</button> -->
                <!-- <button type="submit" @click.prevent="pageName= 'home'" class="btn btn-success m-1">Login</button> -->
              </div>
            </div>
            
            <div class="border border-light p-3 mb-4">
              <div class="text-center">
                <p style="text-align: center;">Don't have an account yet? <button class="btn text-primary" @click.prevent="showRegister()" id="register-button"><strong>Register here!</strong></button></p>
                <p style="text-align: center;"><strong>OR</strong></p>
                <!-- Google Sign in button -->
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
              </div>
            </div>

          <!-- </div> -->

        </form>
      </div>
    </div>
  </section>
  <!-- END LOGIN -->
</div>
</template>

<script>
export default {
  props: ['active', 'loginData'],
  name: "Login",
  data() {
    return {}
  }, 
  methods: {
    showHome() {
      this.$emit('changePage', 'home')
    },
    showRegister() {
      this.$emit('showRegister', 'register')
    },
    sendLogin() {
      // this.$emit('login')
      this.$parent.login()
    }
  } 
}
</script>

<style>

</style>