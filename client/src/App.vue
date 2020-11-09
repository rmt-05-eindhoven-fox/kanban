<template>
<div>


  <LoginPage
    v-if="pageName == 'page-login'"
    @changePage='changePage'
    @userLogin='userLogin'
    @googleLogin='googleLogin'
    @googleLoginError='googleLoginError'
  ></LoginPage>

  <RegisterPage
    v-else-if="pageName == 'page-register'"
    @changePage='changePage'
    @userRegister='userRegister'
  ></RegisterPage>

  <HomePage
    v-else-if="pageName == 'page-home'"
    :categories="categories"
    :tasks="tasks"
    @addTask='addTask'
    @editTask='editTask'
    @userLogout='userLogout'
    @deleteTask='deleteTask'
    @changeTaskCategory='changeTaskCategory'

  ></HomePage> 

</div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import HomePage from './components/HomePage.vue'
// import axios from './config/axios'
import axios from 'axios'
export default {
  name : 'App',
  data() {
    return {
      pageName : 'page-login',
      message : 'Hello from App.vue',
      categories : [],
      tasks : [],
      // server: 'https://app-kanbanya.herokuapp.com'
      server: 'http://localhost:3000'
    }
  },

  components : {
    LoginPage, 
    RegisterPage, 
    HomePage,
    axios
  },

  methods : {
    changePage(name){
      this.pageName = name
    },

    userRegister(payload){
      const { name, email, password } = payload
      axios({
        url : this.server+`/register`,
        method : 'POST',
        data : {
          name, email, password
        }
      })
      .then(_=> {
        this.notif('success', `Registration Successful`)
        this.changePage('page-login')
      })
      .catch(err => {
        this.notif('error', 'Registration failed, please make sure to fill all required fields!')
      })
    },

    notif(status, message){
      this.$swal({
        icon: status,
        title: message
      })
    },

    userLogin(payload){
      axios({
        url : this.server+'/login',
        method : 'post',
        data : {
          email : payload.email,
          password : payload.password
        }
      })
      .then(response => {
        
        const {access_token} = response.data
        localStorage.setItem('access_token', access_token)
        this.notif('success', 'Login Successful')
        this.fetchTasks()
        this.fetchCategories()
        this.pageName = 'page-home'
      })
      .catch(err => {
        this.notif('error', `Invalid username of password`)
      })
    },

    googleLogin(payload){
      axios({
        url : this.server+`/googleLogin`,
        method : 'POST',
        headers : {
          google_access_token : payload
        }
      })
      .then(response => {
        const {access_token} = response.data
        localStorage.setItem('access_token', access_token)
        this.notif('success', 'Login Successful')
        this.fetchTasks()
        this.fetchCategories()
        this.pageName = 'page-home'
      })
      .catch(err => {
        this.notif('error', `Cannot login via Google at this moment, please register to get started`)
      })
    },

    googleLoginError(error){
      this.notif('error', `Cannot login via Google at this moment, please register to get started`)
    },

    userLogout(){
      console.log('userLogout')
      localStorage.clear()
      this.changePage('page-login')
      this.notif('success', `Logged out from KANBAN!`)
    },

    fetchTasks(){
      const access_token = localStorage.getItem('access_token')
      axios({
        url : this.server+'/tasks',
        method : 'get',
        headers : { access_token }
      })
      .then(response => {
        this.tasks = response.data
      })
      .catch(err => {
        this.notif('error', `Cannot logout`)
      })
    },

    fetchCategories(){
      const access_token = localStorage.getItem('access_token')
      axios({
        url : this.server+'/tasks/categories',
        method : 'get',
        headers : { access_token }
      })
      .then(response => {
        this.categories = response.data
      })
      .catch(err => {
        this.notif('error', `BAD REQUEST`)
      })
    },

    addTask(payload){
      const access_token = localStorage.getItem('access_token')
      axios({
        url : this.server+'/tasks',
        method : 'POST',
        headers : { access_token },
        data : {
          description : payload.description,
          CategoryId : payload.CategoryId
        }
      })
      .then(_=> {
        this.fetchTasks()
        this.notif('success', 'Yeay! task added successfully!')
      })
      .catch(err => {
        this.notif('error', `Cannot add Task!`)
      })
    },

    editTask(payload){
      const access_token = localStorage.getItem('access_token')
      axios({
        url : this.server+`/tasks/${payload.taskId}`,
        method : 'PUT',
        headers : {
          access_token
        },
        data : {
          description : payload.description
        }
      })
      .then(_=> {
        this.notif('success', 'Yeay! Task edited successfully')
        this.fetchTasks()
      })
      .catch(err => {
        this.fetchTasks()
        this.notif('error', `You are not authorized to edit this task!`)
      })
    },

    changeTaskCategory(payload){
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
      .then(_ => {
        this.tasks.splice(taskIndex,1)
        task.CategoryId = CategoryId
        this.tasks.push(task)
      })
      .catch(err => {
        this.notif('error', `You are not authorized to move this task!`)
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
      .then(_=> {
        this.fetchTasks()
        this.notif('success', `Task deleted`)
      })
      .catch(err => {
        this.notif('error', `You are not authorized to delete this task!`)
      })
    },
  },
  
  created() {
    const token = localStorage.getItem('access_token')
    if(token){
      this.pageName = 'page-home'
      this.fetchTasks()
      this.fetchCategories()
      
    } else {
      this.pageName = 'page-login'
    }
  },
}
</script>

<style>
  
</style>