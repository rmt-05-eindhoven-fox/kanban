<template>
  <div v-if="pageName == 'Login'" class="w-1/2 m-auto  bg-blue-300 mt-10 shadow-md flex flex-col justify-center">
        <div class="m-auto my-5">Logo</div>
        <form @submit.prevent="postLogin()" class="m-auto flex-col flex">
            
            <input v-model="email" type="text" class="m-auto rounded-sm mb-3 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Email">
            <input v-model="password" type="password" class="m-auto rounded-sm mb-5 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Password">
            
            <button type="submit" class="m-auto px-5 py-2 shadow-md rounded-md bg-teal-400 hover:bg-teal-500 focus:outline-none focus:shadow-outline">
                Sign in
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
            <p>Don't have account ?</p>
            <button @click="showRegister()" class="p-2 bg-teal-400 shadow-md hover:bg-teal-500 rounded-md">Sign up here</button>
        </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: "Login",
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
      postLogin() {
          const payload = {
              email: this.email,
              password: this.password
          }
          this.$emit("postLogin", payload)
          this.email = ""
          this.password = ""
      },
      showRegister() {
          this.$emit("showRegister", "Register")
      },
  },
  props: ['pageName']
}
</script>

<style>
    .g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: flex;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
</style>