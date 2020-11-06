<template>
  <section id="login">
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">

    <div class="" style="height: 70%; background: wheat url('./assets/kanban.png'); background-size: contain; background-repeat: no-repeat; border-radius: 5%; box-shadow: 0px 9px 24px 8px rgba(0,0,0,0.75);">
      <div class="row m-2">
        <div class="col">
          <p style="text-align: center; text-shadow: -2px -1px 1px rgb(245, 226, 226);" class=" h1">Welcome to Kanban App</p>
        </div>
      </div>

      <div class="row justify-content-center " style="height: 70%; ">
        <div class="col-5 rounded" style="">
          <div class="rounded p-2" style="background-color: rgba(250, 250, 250, 0.7);">
            <ul class="list-group list-group-flush">
              <li class="p-2 list-group-item" style="align-text: center">What you can get with kanban</li>
              <li class="p-2 list-group-item" style="background: none;">Flexibility.</li>
              <li class="p-2 list-group-item" style="background: none;">Focus on continuous delivery.</li>
              <li class="p-2 list-group-item" style="background: none;">Reduction of wasted work / wasted time.</li>
              <li class="p-2 list-group-item" style="background: none;">Increased productivity.</li>
              <li class="p-2 list-group-item" style="background: none;">Increased efficiency.</li>
            </ul>
          </div>

        </div>
        <div class="col-6">
          <div class="p-2" >
            <form @submit.prevent="login">
              <p class="h5 rounded" style="text-align: center; background-color: rgba(158, 10, 109, 0.6); height: 30px; color: white;">Log in</p>
              <div class="form-group">
                <p class="h6" style="text-shadow: -1px -1px 0px gainsboro;">Email</p>
                <input type="text" v-model="email" class="form-control" >
              </div>
              <div class="form-group">
                <p class="h6" style="text-shadow: -1px -1px 0px gainsboro;">Password</p>
                <input type="password" v-model="password" class="form-control" >
              </div>
              <div class="form-group">
                <input type="submit" class="form-control btn btn-success">
              </div>
            </form>
            <p class="h6 " style="text-align: center; text-shadow: -1px -1px 0px gainsboro;">OR</p>
            <div class="row p-0 justify-content-center">
              <button v-google-signin-button="clientId" class="google-signin-button"> 
                <img src="https://www.clipartmax.com/png/middle/105-1055517_google-chrome-icon-google-logo-round-png.png" alt="google" style="height: 15px;">
              </button>
            </div>
            <div class="row" style="justify-content: center;">
              <p class="mr-1" >Don't have account?</p>
              <a href="" @click.prevent="form" style="text-decoration: none;"><p>Register here</p></a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: "",
      clientId: '390207241181-48b99jgbdiscpqticbdpoo6hvcfkcvvr.apps.googleusercontent.com'
    }
  },
  methods: {
    form() {
      this.$emit('form', 'register')
    },
    login() {
      let payload = {
        email: this.email, password: this.password
      }
      this.email = ""
      this.password = ""
      this.$emit('login', payload)
    },
    OnGoogleAuthSuccess (idToken) {
      this.$emit('google', idToken)
    },
    OnGoogleAuthFail (error) {
      console.log(error, 'dari error')
    }
  },
}
</script>

<style>
.google-signin-button {
  height: 30px;
  font-size: 13px;
  border-radius: 10px;
}

</style>