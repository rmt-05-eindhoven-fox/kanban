<template>
  <section id="login-page">
         <div class="limiter">
            <div class="container-login100" style="background-image: url('../assets/images/bg-01.jpg');">
               <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                  <div class="login100-form validate-form flex-sb flex-w">
                     <span class="login100-form-title p-b-30">
                        Sign In With
                     </span>

                     <a href="#" class="btn-face">
                        <i class="fa fa-facebook-official"></i>
                        Facebook
                     </a>
                     <!-- <button v-google-signin-button="clientId" class="google-signin-button" style="outline: true"></button> -->

                     <a v-google-signin-button="clientId" href="#" class="btn-google google-signin-button">
                        <img src="../assets/images/icons/icon-google.png" alt="GOOGLE">
                        Google
                     </a>

                  </div>
                  <form @submit.prevent="login" class="login100-form validate-form flex-sb flex-w">
                     <div class="p-t-31 p-b-9">
                        <span class="txt1">
                           Email
                        </span>
                     </div>
                     <div class="wrap-input100 validate-input" data-validate="Email is required">
                        <input v-model="email" class="input100" type="email" name="email" required>
                        <span class="focus-input100"></span>
                     </div>

                     <div class="p-t-13 p-b-9">
                        <span class="txt1">
                           Password
                        </span>

                        <a href="#" class="txt2 bo1 m-l-5">
                           Forgot?
                        </a>
                     </div>
                     <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input v-model="password" class="input100" type="password" name="pass" required>
                        <span class="focus-input100"></span>
                     </div>

                     <div class="container-login100-form-btn m-t-17">
                        <button class="login100-form-btn">
                           Sign In
                        </button>
                     </div>

                     <div class="w-full text-center p-t-55">
                        <span class="txt2">
                           Not a member?
                        </span>

                        <a @click="changePage" href="#" class="txt2 bo1">
                           Sign up now
                        </a>
                     </div>
                  </form>
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
          clientId: '135367631239-73h1l0ipiudk843gtd59goeifnv74ek6.apps.googleusercontent.com'
       }
    },
    methods: {
       login() {
          let payload = {
             email: this.email,
             password: this.password
          }

           this.$emit('login', payload)
      },
      changePage() {
         let payload = {
            page: 'register-page'
         }
         this.$emit('changePage', payload)
      },
      OnGoogleAuthSuccess (idToken) {
         // console.log(idToken)
         this.$emit('googleLogin', idToken)
         // Receive the idToken and make your magic with the backend
      },
      OnGoogleAuthFail (error) {
         console.log(error)
      }
  
    }
}
</script>

<style>

</style>