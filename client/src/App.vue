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
      pageName: "login",
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
      dataTasks: []
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
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    toRegisterPage(data){
      this.pageName = data.pageName
    }
  },

  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.pageName = 'home'
      this.fetchTasks()
    } else {
      this.pageName = 'login'
    }
  }
};
</script>

<style></style>
