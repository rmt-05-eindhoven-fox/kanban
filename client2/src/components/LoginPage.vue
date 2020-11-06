<template>
  <div class="container"> 
    <div class="row"> 
      <div class="row">
          <div class = "login-body mt-4">
            <div class="form-login">
              <h1 style="color: #1b206b;">Kanban App</h1><hr>
              <h2 style="color: #1b206b;">Login</h2>
              <form>
                <div class="form-group">
                  <input 
                    v-model="email" 
                    type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="youremail@email.com">
                </div>

                <div class="form-group">
                  <input 
                    v-model="password" 
                    type="password" class="form-control" id="login-password" placeholder="Password">
                </div>
                
                <div class="btn-group w-100" role="group" aria-label="Basic example">

                  <button 
                    @click.prevent="login"
                    type="submit" 
                    class="btn btn-success w-100">Login</button>
                  <button 
                    @click.prevent="changePage('page-register')"
                    type="submit" 
                    class="btn btn-outline-primary w-100">Register</button>
                </div>
              </form>
              <hr>
              <div class="login-google">
                <div id="my-signin2"></div>
                  <button v-google-signin-button="clientId" class="google-login-button w-100"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/235px-Google_%22G%22_Logo.svg.png" class="google-img-button" alt="Google Sign In"></button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'LoginPage',
  data(){
    return {
      email : '',
      password : '',
      clientId : '257701925850-sj3m6v1ep7cp6dhhht0gn532r1h2sgct.apps.googleusercontent.com',
    }
  },
  methods : {
    changePage(name){
      this.$emit('changePage', name)
    },
    login(){
      let payload = {
        email : this.email, 
        password : this.password
      }
      this.$emit('login', payload)
    },
    OnGoogleAuthSuccess (idToken) {
      this.$emit('googleLogin', idToken)
    },
    // OnGoogleAuthFail (error) {
    //   this.$emit('googleLoginError', error)
    // }
  }
}
</script>

<style>
  .google-login-button{
    border : none;
    border-radius: 4px;
  }
  .google-img-button{
    margin:6px 0;
    width:25px;
  }
</style>