<template>
  <div>
    <v-row align="center">
      <v-col md="8" lg="8">
        <img
          src="../assets/undraw_welcome_cats_thqn.svg"
          style="margin-top: 5vh; margin-left: 3vh;"
        />
      </v-col>
      <v-col md="4" lg="4">
      <img
          src="../assets/images.png"
        />
        <h3 v-if="register">Hi! No entry until you register!</h3>
        <h3 v-else>Hi! No entry until you login!</h3>
        <v-form>
          <v-row>
            <v-col md="10">
              <v-text-field
                v-model="form.name"
                label="Enter your name here"
                required
                md="8"
                v-if="register"
              ></v-text-field>
              <i class="fas fa-envelope"></i>
              <v-text-field
                v-model="form.email"
                type="email"
                label="Enter your email here"
                required
              ></v-text-field>

               <i class="fas fa-lock"></i>
              <v-text-field
                v-model="form.password"
                type="password"
                name="input-10-1"
                label="Enter your password here"
                hint="Whoops! Don't forget: at least 6 characters"
                counter
                required
              ></v-text-field>

              <v-btn
                color="success" class="mr-4" style="display: block; margin-top: 2vh; margin-left: 19vh;" @click.prevent="registerUser" v-if="register"><i class="fas fa-star"></i>Register</v-btn>

              <v-btn color="success" class="mr-4" style="display: block; margin-top: 2vh; margin-left: 19vh;" @click.prevent="login" v-else><i class="fas fa-star"></i>Login</v-btn>
            </v-col>
            
            <h4 v-if="register">
              <h4 style="display: block; margin-top: 2vh; margin-left: 20vh;">Have an account?</h4>
              <a style="display: block; margin-top: 2vh; margin-left: 24vh;" href="#" @click.prevent="changeRegister">Login here</a>
            </h4>
            <h4 style="display: block; margin-top: 2vh; margin-left: 15vh;" v-else>
              No account?
              <a style="display: block; margin-top: 2vh; margin-left: 5vh;" href="#" @click.prevent="changeRegister">Register here</a>
            </h4>
          </v-row>

          <h4 style="display: block; margin-top: 2vh; margin-left: 10vh;">You can log in with Google too!</h4>
          <v-row class="social-login " style="display: block; margin-top: 2vh; margin-left: 15vh; margin-bottom: 10vh;">
            <v-col md="12">
              <v-btn color="primary">
                <i class="fab fa-google"></i>
                <g-signin-button
                  id="gSign"
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError"
                >
                  Google
                </g-signin-button>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import key from '../config/key'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'LandingPage',
  data() {
    return {
      register: true,
      form: {
        name: '',
        email: '',
        password: ''
      },
      googleSignInParams: {
        client_id: '752137312998-po5n9hnqjc024vc8fu2o70184q34264u.apps.googleusercontent.com'
      }
    }
  },
  props: ['isLogin', 'changeForm'],
  methods: {
    changeRegister() {
      this.register = !this.register
    },
    registerUser() {
      const registForm = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      return this.$emit('REGISTER', registForm)
    },
    login() {
      const loginForm = {
        email: this.form.email,
        password: this.form.password
      }
      this.form.email = ''
      this.form.password = ''
      return this.$emit('LOGIN', loginForm)
    },
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile()
      const idToken = googleUser.getAuthResponse().id_token
      axios
        .post(`${this.$BASE_URL}/users/google`, { idToken: idToken })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          Swal.fire('Hi!', 'Welcome!', 'success')
          return this.$emit('hasLoggedIn', true)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSignInError(error) {
      console.log('OH NO', error)
    }
  },
  watch: {
    changeForm: function(val, old) {
      this.register = false
    }
  }
}
</script>

<style lang="css" scoped>
.g-signin-button {
  padding: 4px 8px;
  border-radius: 15px 50px 30px 5px;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>