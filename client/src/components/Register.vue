<template>
  <div v-if="pageName == 'Register'" class="w-1/2 m-auto mt-10 border-2 border-black flex flex-col justify-center">
        <div class="m-auto my-5">Logo</div>
            <form @submit.prevent="postRegister()" class="m-auto flex-col flex">
                
                <input v-model="email" type="text" class="m-auto rounded-sm mb-3 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Email">
                <input v-model="password" type="password" class="m-auto rounded-sm mb-5 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Password">
                
                <button type="submit" class="m-auto w-1/2 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline">
                    Sign up
                </button>
            </form>

            <div class="m-auto my-5">OR</div>

            <button class="m-auto w-1/2 mb-6 rounded-sm bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline">
                Continue with Google
            </button>
            <div class="m-auto mb-6 text-center">
                <p>Already have account ?</p>
                <button @click="showLogin()">Sign in here</button>
            </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
      return {
        email: "",
        password: "",
      }
  },
  methods: {
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
      }
  },
  props: ['pageName']
}
</script>

<style>

</style>