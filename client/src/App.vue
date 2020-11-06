<template>
  <div>
    <LoginPage 
    :logoPng="logoUrl" v-if="pageName == 'login'"
    @toRegisterPage="toRegisterPage"
    @userLogin="userLogin"
    @googleLogin="googleLogin"
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
      @editTask="editTask"
      @editCategory="editCategory"
      @deleteTask="deleteTask"
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
    googleLogin(idToken) {
      axios({
        url: '/login-google',
        method: `post`,
        headers: {
          google_access_token: idToken
        }
      })
      .then(response => {
        console.log(response);
        const {access_token, email} = response.data
        console.log(email);
        localStorage.setItem('token', access_token)
        localStorage.setItem('email', email)
        this.pageName = 'home'
        this.userLoggedIn = email
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err);
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
      const taskOwner = localStorage.getItem('full_name')
      axios({
        url: '/tasks',
        method: 'post',
        data:{
          title: payload.inputTitle,
          category: payload.selectedCategory,
          taskOwner: taskOwner
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
    },
    editTask(payload){
      const id = +payload.id
      const token = localStorage.getItem('token')
      axios({
        url: `/tasks/${id}`,
        method: 'put',
        data: {
          title: payload.title,
          category: payload.category
        },
        headers: {
          token
        }
      })
      .then(data => {
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    editCategory(payload){
      const id = +payload.id
      const token = localStorage.getItem('token')
      axios({
        url: `/tasks/${id}`,
        method: 'patch',
        data: {
          category: payload.category
        },
        headers:{
          token
        }
      })
      .then(data => {
        console.log(data, 'succes chang category');
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err.response);
      })
    },
    deleteTask(payload){
      const id = +payload.id
      const token = localStorage.getItem('token')
      axios({
        url: `/tasks/${id}`,
        method: `delete`,
        headers : {
          token
        }
      })
      .then(data => {
        console.log(data, 'successs');
        this.fetchTasks()
      })
      .catch(err =>{
        console.log(err.response);
        this.fetchTasks()
      })
    }
  },

  created() {
    const token = localStorage.getItem('token')
    let username = localStorage.getItem('full_name')
    let email = localStorage.getItem('email')
    if (token) {
      this.userLoggedIn = username || email
      this.fetchTasks()
      this.pageName = 'home'
    } else {
      this.pageName = 'login'
    }
  }
};
</script>

<style></style>
