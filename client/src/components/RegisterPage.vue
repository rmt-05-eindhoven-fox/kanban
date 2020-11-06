<template>
  <div class = "container">
    <div class="row">
      <div class = "col"></div>
      
      <div class = "col-5">
        <div class = "login-section mt-0">

          <div class = "login-body mt-5">
            <div class="form-login">
              <h2 style="color: #1b206b; text-align:center;">Register</h2><hr>
              <form>
                <div class="form-group">
                  <input 
                    v-model="name" 
                    type="text" class="form-control" id="register-name" aria-describedby="emailHelp" placeholder="Your Name">
                </div>

                <div class="form-group">
                  <input 
                    v-model="email" 
                    type="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="youremail@email.com">
                </div>

                <div class="form-group">
                  <input 
                    v-model="password" 
                    type="password" class="form-control" id="register-password" placeholder="Password">
                </div>
                
                <button 
                  @click.prevent="userRegister"
                  type="submit" 
                  class="btn btn-outline-primary w-100">Register</button>
              </form>
              
              <div class = "mt-2">
                <a 
                  @click.prevent = "changePage('page-login')"
                  href="" >Back to Login</a>
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
  name : 'RegisterPage',
  data(){
    return {
      name : '',
      email : '',
      password : '',
    }
  },
  methods : {
    changePage(pageName){
      this.$emit('changePage', pageName)
    },
    userRegister(){
      let payload = {
        name : this.name,
        email : this.email,
        password : this.password
      }
      this.$emit('userRegister', payload)
      this.name = ''
      this.email = ''
      this.password = ''
    },
    
  }
}
</script>

<style>
</style>