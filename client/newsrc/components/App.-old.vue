<template>
  <div>
    <!-- <h1>
      {{message}}
    </h1> -->

    <!-- Login Page -->
    <!-- <Login v-if="pageName == 'login'" @changePage="changePage"></Login> -->
    <Login
      :active="loginPage"
      v-if="pageName == 'login'" 
      @changePage="changePage" 
      @showRegister="showRegister"
      :loginData="loginForm"
    ></Login>
    <Register
      v-if="pageName == 'register'" 
      @changePage="changePage"
      :registerData="registerForm"
    ></Register>
    <!-- Home Page -->
    <Home v-else-if="pageName == 'home'"
    class="home-page" :style="{display: homePage ? 'block' : 'none'}"
     ></Home>
    <Category v-else-if="pageName == 'category'"></Category>
    
  </div>
</template>

<script>
import axios from 'axios'
import Login from "./components/Login.vue"
import Register from "./components/Register"
import Home from "./components/Home"
// import Category from "./components/Category"

export default {
  name: "App",
  data() {
    return {
      server: 'http://localhost:3000',
      // message: "Halo Dunia!",
      pageName: 'login',
      loginPage: true,
      registerPage: false,
      homePage: false,
      loginForm: {
        username: null,
        password: null
      },
      registerForm: {
        username: null,
        email: null,
        password: null
      },
      taskList: [],
      username: null,
      // email: null
    }
  },
  components: {
    Login, 
    Register,
    Home, 
    // Category
  },
  created() {
    this.checkLocalStorage()
  },
  methods: {
    changePage(name) {
      this.pageName = name
    },


    showRegister(name) {
      this.pageName = 'register'
    },

    showHome(name) {
      this.pageName = 'home'
    },

    checkLocalStorage() {
      if(!localStorage.getItem('access_token')) {
        // changePage('login')
        this.loginPage = true,
        this.registerPage = false,
        this.homePage = false
      } else {
        // this.showHome()
        this.username = localStorage.getItem('username')
        this.loginPage = false,
        this.homePage = true
        this.showTasks()
      }
    },

    getHomePage(bool) {
      this.homePage = bool
    },

    showTasks() {
      axios({
        method: 'GET',
        url: this.server + '/tasks',
        headers: {Bearer: localStorage.getItem('access_token')}
      })
      .then(res => {
        this.taskList = res.data.payload
      })
      .catch(err => {
        console.log(err)
      })
    },

    register() {
      if(this.registerForm.username === null || this.registerForm.email === null || this.registerForm.password === null) {
        this.alert('error', 'Please fill in all fields!')
      } else {
        let payload = {
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.registerForm.password,
        }
        axios({
          method: 'POST',
          url: this.server+'/register',
          data: payload
        })
        .then( res => {
          this.alert('success', `You are registered as ${payload.username}`)
          this.changePage('register')
        })
        .catch(err => {
          console.log(err)
          this.alert('error', 'Register failed!')
        })
      }
    },
    login() {
      let self = this
      if(self.loginForm.username === null || self.loginForm.password === null) {
        self.alert('error', 'Email and password is required!')
      } else {
        let payload = {
          username: self.loginForm.username,
          password: self.loginForm.password
        }
        axios({
          method: 'POST',
          url: this.server+'/login',
          data: payload
        })
        .then(res => {
          console.log(res)

          self.alert(`success', 'You have successfully logged in as ${payload.username} `)
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('username', res.config.data.split(':')[1].split(',')[0])
          // localStorage.setItem('email', res.data.payload.users.email)
          self.username = localStorage.getItem('username')
          // self.email = localStorage.getItem('email')
          self.isLogin = true
          self.loginPage = false
          self.homePage = true
          // this.changePage('home')
          self.checkLocalStorage()
        })
        .catch(err => {
          // console.log(err)

          self.alert('error', 'Incorrect username of password!')

        })
      }
    },
    alert(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    }
  },

}
</script>

<style scoped>

</style>