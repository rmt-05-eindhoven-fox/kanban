<template>
  <div>
    <!-- REGISTER -->

    <section class="container" id="register">

      <div style="text-align: left; padding: 20px;">
        <!-- <button class="btn btn-success m-1" id="login-button">Login</button> -->
      </div>

      <div class="row justify-content-center mt-5">
        <div class="col-4"> 
          <form @submit.prevent="sendRegister"> 

            <h5 style="text-align: center;">Please input your email and password to register</h5><br><br>

            
            <div class="form-group">
              <label for="register-username">Username</label>
              <input
              v-model="registerData.username"
              class="form-control" 
              type="text" 
              id="register-username">
            </div>
            <div class="form-group">
              <label for="register-email">Email</label>
              <input
              v-model="registerData.email"
              class="form-control" 
              type="email" 
              id="register-email">
            </div>
            <div class="form-group">
              <label for="register-password">Password</label>
              <input 
              v-model="registerData.password"
              class="form-control" 
              type="password" 
              id="register-password">
            </div>

            <!-- <div class="alert alert-danger" role="alert" id="reg-errors">
            </div> -->

            <div class="border border-light p-2 mb-2">
              <div class="text-center">
                <button type="submit" class="btn btn-primary  m-1">Register</button><br><br>
                <p style="text-align: center;"><button class="btn text-primary" @click.prevent="showLogin()" id="login-button">return to login</button></p>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
    <!-- END REGISTER -->
  </div>
</template>

<script>
export default {
  props: ['registerData'],
  name: "Register",
  data() {
    return {}
  }, 
  methods: {
    showLogin() {
      this.$emit('changePage', 'login')
    },
    sendRegister() {
    this.$parent.register()
    }
  } 
}
</script>

<style>

</style>