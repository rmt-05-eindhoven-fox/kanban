<template>
  <section id="register-page">
         <div class="limiter">
            <div class="container-login100" style="background-image: url('../assets/images/bg-01.jpg');">
               <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                  <form @submit.prevent="register" class="login100-form validate-form flex-sb flex-w">
                     <span class="login100-form-title">
                        Sign Up
                     </span>

                     <div class="p-t-31 p-b-9">
                        <span class="txt1">
                           Username
                        </span>
                     </div>

                     <div class="wrap-input100 validate-input" data-validate="Username is required">
                        <input v-model="username" class="input100" type="text" name="username" required>
                        <span class="focus-input100"></span>
                     </div>

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

                     </div>
                     <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input v-model="password" class="input100" type="password" name="pass" required>
                        <span class="focus-input100"></span>
                     </div>

                     <div class="container-login100-form-btn m-t-17">
                        <button class="login100-form-btn">
                           Sign Up
                        </button>
                     </div>

                     <div class="w-full text-center p-t-55">
                        <span class="txt2">
                           Already registered?
                        </span>

                        <a @click="changePage" href="#" class="txt2 bo1">
                           Sign in here
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
    name: 'RegisterPage',
    data() {
       return {
          username: '',
          email: '',
          password: ''
       }
    },
    methods: {
       changePage() {
         let payload = {
            page: 'login-page'
         }
         this.$emit('changePage', payload)
      },
       register() {
          let payload = {
             username: this.username,
             email: this.email,
             password: this.password
          }
          this.$emit('register', payload)
       }
    }
}
</script>

<style>

</style>