<template>
  <v-app>
    <Navbar
      @LOGOUT="logout"
      @changeForm="changeForm"
      @BACK="backHome"
      :isLogin="isLogin"
    ></Navbar>
    <div id="landingpage" v-if="!isLogin">
      <LandingPage
        :changeForm="register"
        @LOGIN="login"
        @REGISTER="registerUser"
        @hasLoggedIn="isLogin = true"
      ></LandingPage>
    </div>
    <div id="mainpage" v-else>
      <MainPage
        :allProjects="allProjects"
        :home="home"
        @FETCH_PROJECT="fetchUserProjects"
      ></MainPage>
    </div>

    <div id="errMsg">
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="red"
        top
        right
        v-for="(err, i) in errors"
        :key="i"
      >
        {{ err }}
        <v-btn color="white" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'
export default {
  name: 'App',
  components: {
    Navbar,
    LandingPage,
    MainPage
  },
  data() {
    return {
      isLogin: false,
      register: false,
      allProjects: {
        personal: [],
        other: []
      },
      home: false,
      snackbar: true,
      errors: [],
      timeout: 5000
    }
  },
  methods: {
    changeForm() {
      this.register = !this.register
    },
    login(form) {
      axios
        .post(`${this.$BASE_URL}/users/login`, form)
        .then(({ data }) => {
          this.isLogin = true
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('id', data.id)
          Swal.fire('Hi!', 'Welcome!', 'success')
        })
        .catch(({ response }) => {
          response.data.err.forEach(el => {
            this.errors.push(el)
          })
        })
    },
    registerUser(form) {
      axios
        .post(`${this.$BASE_URL}/users/register`, form)
        .then(({ data }) => {
          this.isLogin = true
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('id', data.id)
          Swal.fire('Hi!', 'Welcome!', 'success')
        })
        .catch(({ response }) => {
          response.data.err.forEach(el => {
            this.errors.push(el)
          })
        })
    },
    logout() {
      Swal.fire({
        title: 'Oops, are you sure?',
        text: "You won't be able to go back!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then(result => {
        if (result.value) {
          Swal.fire({
            title: 'Goodbye!',
            text: 'See You Again!',
            icon: 'success',
            timer: 1500
          })
          this.isLogin = false
          this.allProjects.personal = []
          this.allProjects.other = []
          localStorage.clear()
        }
      })
    },
    
    backHome() {
      this.home = !this.home
    },
    fetchUserProjects() {
      axios
        .get(`${this.$BASE_URL}/projects`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          this.allProjects.personal = data.personal
          this.allProjects.other = data.other
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  watch: {
    isLogin: function(val, old) {
      if (val) {
        this.fetchUserProjects()
      }
    },
    errors(val) {
      setTimeout(() => {
        this.errors = []
      }, 5000)
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.isLogin = true
    }
  }
}
</script>