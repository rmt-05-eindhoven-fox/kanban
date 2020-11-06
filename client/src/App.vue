<template>
  <div>
    <LoginPage 
    :logoPng="logoUrl" v-if="pageName == 'login'"
    @toRegisterPage="toRegisterPage"
    @userLogin="userLogin"
    ></LoginPage>
    <RegisterPage
      @createAccount="createAccount"
      @toLoginPage="toLoginPage"
      :logoPng="logoUrl"
      v-else-if="pageName == 'register'"
    ></RegisterPage>
    <HomePage
      :dataCat="categoryList"
      :logoPng="logoUrl"
      :tasks="dataTasks"
      :username="userLoggedIn"
      @logout="logout"
      @postTask="postTask"
      v-else-if="pageName == 'home'"
    ></HomePage>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import logo from "./assets/logo-kanban@2x.png";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      pageName: "home",
      logoUrl: logo,
      categoryList: [
        {
          category: "Backlog",
        },
        {
          category: "Todo",
        },
        {
          category: "On Going",
        },
        {
          category: "Completed",
        },
      ],
      dataTasks: [],
      userLoggedIn: ''
    };
  },
  components: {
    HomePage,
    LoginPage,
    RegisterPage,
  },
  methods: {
    fetchTasks() {
      axios({
        url: '/tasks',
        method: 'get'
      })
      .then(({data}) => {
        this.dataTasks = data
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    createAccount(payload){
      axios({
        url: '/register',
        method: 'post',
        data: {
          full_name: payload.full_name,
          email: payload.email,
          password: payload.password
        }
      })
      .then(({data}) => {
        console.log(data);
        this.pageName = 'login'
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    toLoginPage(data){
      this.pageName = data.pageName
    },
    userLogin(payload){
      axios({
        url: '/login',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('full_name', data.full_name)
        localStorage.setItem('email', data.email)
        let username = localStorage.getItem('full_name')
        this.userLoggedIn = username
        this.pageName = 'home'
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err.response.data.message);
      })
    },
    toRegisterPage(data){
      this.pageName = data.pageName
    },
    logout(clear){
      this.pageName = 'login'
      this.userLoggedIn = ''
    },
    postTask(payload){
      const token = localStorage.getItem('token')
      axios({
        url: '/tasks',
        method: 'post',
        data:{
          title: payload.inputTitle,
          category: payload.selectedCategory
        },
        headers: {
          token
        }
      })
      .then(data => {
        console.log(data)
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  },

  created() {
    const token = localStorage.getItem('token')
    let username = localStorage.getItem('full_name')
    if (token) {
      this.userLoggedIn = username
      this.fetchTasks()
      this.pageName = 'home'
    } else {
      this.pageName = 'login'
    }
  }
};
</script>

<style></style>
