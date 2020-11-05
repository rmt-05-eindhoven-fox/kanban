<template>
  <div v-if="pageName == 'Login'" class="w-1/2 m-auto mt-10 border-2 border-black flex flex-col justify-center">
        <div class="m-auto my-5">Logo</div>
        <form @submit.prevent="postLogin()" class="m-auto flex-col flex">
            
            <input v-model="email" type="text" class="m-auto rounded-sm mb-3 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Email">
            <input v-model="password" type="password" class="m-auto rounded-sm mb-5 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Password">
            
            <button type="submit" class="m-auto w-1/2 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline">
                Sign in
            </button>
        </form>

        <div class="m-auto my-5">OR</div>

        <button class="m-auto w-1/2 mb-6 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline">
            Continue with Google
        </button>
        <div class="m-auto mb-6 text-center">
            <p>Don't have account ?</p>
            <button @click="showRegister()">Sign up here</button>
        </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
      return {
        email: "",
        password: "",
      }
  },
  methods: {
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
      }
  },
  props: ['pageName']
}
</script>

<style>

</style>