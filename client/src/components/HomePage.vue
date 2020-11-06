<template>
  <section id="home-page" style="width: 100vw; height: 100vh; align-items: center; position: relative;">
    <video autoplay muted loop id="myVideo" style="height: auto; width: 100%; position: absolute; z-index: -2;">
      <source src="../assets/discussing_features.mp4" type="video/mp4">
    </video>
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="jumbotron jumbotron-fluid px-4 bg-light shadow h-75" style="opacity: 0.8;">
        <h1 class="display-4">Welcome to Kanban!</h1>
        <p class="lead">This is an app for your company to help you and your colleagues manage your projects.</p>
        <hr class="my-4">
        <p>Sometimes managing tasks can be hard, right?</p>
      </div>
      <div class="jumbotron jumbotron-fluid text-right px-4 bg-light shadow h-75" style="opacity: 0.8;">
        <form
          @submit.prevent="passRegisForm()">
          <div class="form-group">
            <label for="sign-up-name">Name</label>
            <input 
              v-model="formRegister.name"
              type="text" class="form-control" id="sign-up-name" aria-describedby="emailHelp" placeholder="Enter name" style="border: bottom;">
          </div>
          <div class="form-group">
            <label for="sign-up-email">Email address</label>
            <input 
              v-model="formRegister.email"
              type="email" class="form-control" id="sign-up-email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="sign-up-password">Password</label>
            <input 
              v-model="formRegister.password"
              type="password" class="form-control" id="sign-up-password" placeholder="Password">
          </div>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal-sign-in">
              Sign In
            </button>            
            <button type="submit" class="btn btn-primary">Sign Me Up</button>
        </form>          
      </div>
    </div>

    <!-- ! Modal Sign in -->
    <div class="modal fade" id="modal-sign-in" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <form
            @submit.prevent="passLoginForm()">
          <div class="modal-body">
              <div class="form-group p-4">
                <label for="sign-in-email">Email address</label>
                <input 
                  v-model="formLogin.email"
                  type="email" class="form-control" id="sign-in-email" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group p-4">
                <label for="sign-in-password">Password</label>
                <input 
                  v-model="formLogin.password"
                  type="password" class="form-control" id="sign-in-password" placeholder="Password">
              </div>
            </div>
            <div class="modal-footer"> 
              <GoogleLogin class="mr-auto" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>              
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Let me in!</button>
            </form>
          </div>
        </div>
      </div>    
  </section>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: 'HomePage',
  components: {
    GoogleLogin
  },
  data() {
    return {
      formLogin: {
        email: '',
        password: ''
      },
      formRegister: {
        name: '',
        email: '',
        password: ''
      },
      params: {
        client_id: '81303156909-bjn8cue6cp3sit10qh79ogo4qjt961qm.apps.googleusercontent.com'
      },
      renderParams: {
        width: 150,
        height: 40,
        longtitle: false
      }
    }
  },
  methods: {
    passRegisForm() {
      const payload = this.formRegister;
      this.$emit('register', payload);
    },
    passLoginForm() {
      $('#modal-sign-in').modal('toggle');
      const payload = this.formLogin;
      this.$emit('login', payload);
    },
    clearRegisForm() {
      for (const key in this.formRegister) {
        this.formRegister[key] = '';
      }
    },
    clearLoginForm() {
      for (const key in this.formLogin) {
        this.formLogin[key] = '';
      }
    },
    onSuccess(googleUser) {
      $('#modal-sign-in').modal('toggle');
      Swal.showLoading();
      let google_access_token = googleUser.getAuthResponse().id_token;
      const payload = {
        google_access_token
      };
      this.$emit('googleLogin', payload);
    },
    onFailure() {
      console.log('error')
    }
  },
  props: [ 'registered' ]
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>