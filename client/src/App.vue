<template>
  <div>
    <div id="main">
      <!-- Login Page -->
      <LoginPage 
      v-if="pageName === 'login-page'"
      @changePage = 'changePage'
      @login = 'login'
      >
      </LoginPage>

      <!-- Regis Page -->
      <RegisPage 
      v-else-if="pageName === 'regis-page'"
      @regis = 'register'>
      </RegisPage>
    
      <!-- Home Page -->
      <HomePage 
      v-else-if="pageName === 'home-page'"
      :categories='listCategory'
      :tasks='listTask'
      @addTask='addTask'
      @logout='logout'>
      </HomePage>
    </div>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage';
import RegisPage from './components/RegisPage';
import HomePage from './components/HomePage';
import axios from './config/axios';

export default {
  name: 'App',
  data() {
    return {
      pageName: 'login-page',
      listCategory: [],
      listTask: []
    }
  },
  components: {
    LoginPage,
    HomePage,
    RegisPage
  },
  methods: {
    changePage(name) {
      this.pageName = name
    },
    login(payload){
      axios({
        url: "/login",
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({data}) => {
          const token = data.access_token;
          localStorage.setItem("token", token);
          this.pageName = 'home-page';
          this.checkLogin();
        })
        .catch(err => {
          console.log(err.response);
        })
    },

    register(payload){
      axios({
        url: '/register',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({data}) => {
          console.log('sukses');
          this.pageName = 'login-page';
        })
        .catch(err => {
          console.log(err.response);
        })
    },

    fetchCategory(){
      axios({
        url: '/category',
        method: 'get'
      })
        .then(({data}) => {
          console.log(data);
          this.listCategory = data
        })
        .catch(err => {
          console.log(err.response);
        })
    },

    checkLogin() {
      if(localStorage.getItem('token')){
        this.fetchCategory()
        this.fetchTask()
        this.pageName = 'home-page';
      } else {
        this.pageName = 'login-page';
      }
    },

    fetchTask() {
      const token = localStorage.getItem("token");
      axios({
        url: '/task',
        method: 'get',
        headers: {
          access_token : token
        }
      })
        .then(({data}) => {
          this.listTask = data;
        })
        .catch(err => {
          console.log(err.response)
        })
    },

    addTask(payload){
      const token = localStorage.getItem("token");

      axios({
        url: '/task',
        method: 'post',
        data: {
          title: payload.title,
          CategoryId: payload.CategoryId
        },
        headers: {
          access_token : token
        }
      })
        .then(({data}) => {
          this.checkLogin();
        })
        .catch(err => {
          console.log(err);
        })
    },

    logout(payload){
      this.pageName = payload;
    }


  },
  created() {
    this.checkLogin()
  }
}
</script>

<style>

</style>