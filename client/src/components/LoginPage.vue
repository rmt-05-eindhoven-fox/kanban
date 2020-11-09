<template>
  
  <div class = "container">
    <div class="row">
      <div class = "col"></div>
      <div class = "col-5">
        <div class = "login-section mt-0">
          <div class = "login-body mt-5 style: background-color: blue;">
            <div class="form-login">
              <h2 style="color: #1b206b; text-align:center; color:white;">KANBAN!</h2><hr>
              <h5 style="color: #1b206b; text-align:center; color: white;">Please login here!</h5> <br>
              <form>

                <div class="form-group">
                  <input 
                    v-model="email" 
                    type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="example@email.com">
                </div>

                <div class="form-group">
                  <input 
                    v-model="password" 
                    type="password" class="form-control" id="login-password" placeholder="Password">
                </div>
                
                
                <div class="btn-group w-100" role="group" aria-label="Basic example" style="margin-bottom:10px;">
                  <button 
                    @click.prevent="userLogin"
                    type="submit" 
                    class="btn btn-success w-100">Login</button>
                </div> 
                <div class="btn-group w-100" role="group" aria-label="Basic example">
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
      <div class = "col"></div>
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
    userLogin(){
      let payload = {
        email : this.email, 
        password : this.password
      }
      this.$emit('userLogin', payload)
    },
    OnGoogleAuthSuccess (idToken) {
      this.$emit('googleLogin', idToken)
    },
    OnGoogleAuthFail (error) {
      this.$emit('googleLoginError', error)
    }
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