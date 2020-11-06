<template>
  <div>
    <LoginPage
      v-if="currentPage == 'login-page'"
      @changePage='changePage'
      @login='login'
      @googleLogin='googleLogin'
    ></LoginPage>

    <RegisterPage
      v-else-if="currentPage == 'page-register'"
      @changePage='changePage'
      @register='register'
    ></RegisterPage>

    <Dashboard
      v-else-if="currentPage == 'page-dashboard'"
      :categories="categories"
      :tasks="tasks"
      @addTask='addTask'
      @editTask='editTask'
      @logout='logout'
      @deleteTask='deleteTask'
      @editCategory='editCategory'
    ></Dashboard>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import Dashboard from './components/Dashboard.vue'
import axios from 'axios'

export default {
  name: 'App',

  data() {
    return {
      server: 'localhost:3000',
      categories: [],
      tasks : [],
      currentPage: 'login-page'
    }
  },

  components: {
    LoginPage, 
    RegisterPage,
    Dashboard,
    // axios
  }, 

  methods: {

    changePage(name) {
      this.currentPage = name
    }, 

    notif(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    },

    register(payload) {
      const {username, email, password} = payload
      axios.post(`${this.server}/register`, payload)
      .then( res => {
        this.notif('success', 'Register successful! Please login to get started...')
        this.changePage('login-page')
      })
      .catch(err => {
        this.notif('error', 'Registration failed, please make sure to fill all required fields!')
      })
    },

    login(payload) {
      const {email, password} = payload
      axios.post(`${this.server}/login`, payload)
      .then(response => {
        const {access_token} = response.data
        localStorage.setItem('access_token', access_token)
        this.showSuccess('Login Successful')
        this.showTasks()
        this.showCategories()
        this.currentPage = 'page-dashboard'
      })
      .catch(err => {
        this.notif('error', `${err.response.data.message}`)
      }) 
    },

    googleLogin(payload) {
      const options = {
        headers: {
          google_access_token : payload
        }
      };
      axios.post(`${this.server}/googleLogin`, options)
      .then(response => {
        const {access_token} = response.data
        localStorage.setItem('access_token', access_token)
        this.showSuccess('Login Successful')
        this.showTasks()
        this.showCategories()
        this.currentPage = 'page-dashboard'
      })
      .catch(err => {
        this.notif('error', `${err.response.data.message}`)
      })
    },

    logout() {
      localStorage.clear()
      this.currentPage('login-page')
      this.notif('success', 'You have logged out of KANBAN!')
    },

    showTasks() {
      const access_token = localStorage.getItem('access_token')
      const options = {
        headers: {access_token}
      };
      axios.get(`${this.server}/tasks`, options)
      .then(response => {
        this.tasks = response.data
      })
      .catch(err => {
        this.notif('error', `${err.response.data.message}`)
      })
    },

    showCatgories() {
      const access_token = localStorage.getItem('access_token')
      const options = {
        headers: {access_token}
      };
      axios.get(`${this.server}/tasks/categories`, options)
      .then(response => {
        this.categories = response.data
      })
      .catch(err => {
        this.notif('error', `${err.response.data.message}`)
      })
    },

    addTask(payload) {
      const access_token = localStorage.getItem('access_token')
      // const options = {
      //   headers: {access_token}
      // };
      axios({
        url : this.server+'/tasks',
        method : 'POST',
        headers : { access_token },
        data : {
          title : payload.title,
          description : payload.description,
          CategoryId : payload.CategoryId
        }
      })
      .then( res => {
        this.showTasks()
        this.notif('success', 'Task has been added successfully')
      })
      .catch(err => {
        this.showTasks()
        this.notif('error', `${err.response.data.message}`)
      })
    },

    editTask(payload) {
      const access_token = localStorage.getItem('access_token')

      axios({
        url : this.server+'/tasks',
        method : 'PUT',
        headers : { access_token },
        data : {
          title : payload.title,
          description : payload.description
        }
      })
      .then( res => {
        this.showTasks()
        this.notif('success', 'Task has been edited successfully')
      })
      .catch(err => {
        this.showTasks()
        this.notif('error', `${err.response.data.message}`)
      })
    },

    editCategory(payload){
      const { taskId, CategoryId } = payload
      const access_token = localStorage.getItem('access_token')
      const taskIndex = this.tasks.findIndex( el => el.id === taskId)
      const task = this.tasks[taskIndex]
      axios({
        url : this.server+`/tasks/${taskId}`,
        method : 'PATCH',
        headers : {
          access_token
        },
        data : {
          CategoryId
        }
      })
      .then(res => {
        this.tasks.splice(taskIndex,1)
        task.CategoryId = CategoryId
        this.tasks.push(task)
      })
      .catch(err => {
        this.notif('error', `${err.response.data.message}`)
      })
    },


    deleteTask(payload){
      const access_token = localStorage.getItem('access_token')
      axios({
        url : this.server+`/tasks/${payload.taskId}`,
        method : 'DELETE',
        headers : {
          access_token
        }
      })
      .then(res => {
        this.showTasks()
        this.notif('success', 'Task has been edited successfully')
      })
      .catch(err => {
        this.notif('error', `${err.response.data.message}`)
      })
    },

  },

  created() {
    if(localStorage.getItem('access_token')) {
      this.currentPage = 'page-dashboard'
      this.showCategories()
      this.showTasks()
    } else {
      this.currentPage = 'login-page'
    }
  }, 
  mounted() {

  }
}
</script>
  
<style>

</style>