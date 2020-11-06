<template>
  <div v-if="pageName == 'Register'" class="w-1/2 m-auto  bg-blue-300 mt-10 shadow-md flex flex-col justify-center">
        <div class="m-auto my-5">Logo</div>
            <form @submit.prevent="postRegister()" class="m-auto flex-col flex">
                
                <input v-model="email" type="text" class="m-auto rounded-sm mb-3 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Email">
                <input v-model="password" type="password" class="m-auto rounded-sm mb-5 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Password">
                
                <button type="submit" class="m-auto px-5 py-2 shadow-md rounded-md bg-teal-400 hover:bg-teal-500 focus:outline-none focus:shadow-outline">
                    Sign up
                </button>
            </form>

            <div class="m-auto my-5">OR</div>

            <div class="m-auto mb-5">
                <GoogleLogin class="g-signin-button" :params="params" :onSuccess="onSuccess">
                    <div class="h-10 w-12">
                    <font-awesome-icon class="h-full w-full" :icon="['fab', 'google-plus']"></font-awesome-icon>
                    </div>
                    <div class="pr-3">
                        <p>Login</p>
                    </div>
                </GoogleLogin>
            </div>

            <div class="m-auto mb-6 text-center">
                <p>Already have account ?</p>
                <button @click="showLogin()" class="p-2 bg-teal-400 shadow-md hover:bg-teal-500 rounded-md">Sign in here</button>
            </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: "Register",
  data() {
      return {
        email: "",
        password: "",
        params: {
            client_id: "463274167559-ro4fqfm44nf7o5he68nf50u2699rgt6o.apps.googleusercontent.com"
        },
        renderParams: {
            width: 250,
            height: 50,
            longtitle: true
        }
      }
  },
  components: {
       GoogleLogin
  },
  methods: {
      onSuccess(googleUser) {
            const google_token = googleUser.getAuthResponse().id_token;
            this.$emit("postGoogleLogin", google_token)
        },
      postRegister() {
          const payload = {
              email: this.email,
              password: this.password
          }
          this.$emit("postRegister", payload)
          this.email = ""
          this.password = ""
      },
      showLogin() {
          this.$emit("showLogin", "Login")
      },
      onSignIn(googleUser) {
          const google_token = googleUser.getAuthResponse().id_token;
          console.log(`====Google Token====`)
          console.log(google_token)
          this.$emit("postGoogleLogin", google_token)
      }
  },
  props: ['pageName']
}
</script>

<style>

</style>