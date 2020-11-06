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

import axios from './config/axios'


export default {
  name : 'App',
  data() {
    return {
      pageName : 'page-login',
      message : 'Hello from App.vue',
      categories : [],
      tasks : [],
    }
  },
  methods : {
    changePage(name){
      this.pageName = name
    },
    userRegister(payload){
      const { name, email, password } = payload
      axios({
        url : `/user/register`,
        method : 'POST',
        data : {
          name, email, password
        }
      })
      .then(_=> {
        this.showSuccess(`Registration Successful`)
        this.changePage('page-login')
      })
      .catch(err => {
        this.showError(err.response.data.message)
      })

    },

    userLogin(payload){
      axios({
        url : '/user/login',
        method : 'post',
        data : {
          email : payload.email,
          password : payload.password
        }
      })
      .then(response => {
        
        const {access_token} = response.data
        localStorage.setItem('access_token', access_token)
        this.showSuccess('Login Successful')
        this.fetchTasks()
        this.fetchCategories()
        this.pageName = 'page-home'

      })
      .catch(err => {
        this.showError(err.response.data.message)
      })
    },

    googleLogin(payload){
      axios({
        url : `/user/login-google`,
        method : 'POST',
        headers : {
          google_access_token : payload
        }
      })
      .then(response => {

        const {access_token} = response.data
        localStorage.setItem('access_token', access_token)
        this.showSuccess('Login Successful')
        this.fetchTasks()
        this.fetchCategories()
        this.pageName = 'page-home'

      })
      .catch(err => {
        this.showError(err)
      })
    },

    googleLoginError(error){
      this.showError(error)
    },


    userLogout(){
      console.log('userLogout')
      localStorage.clear()
      this.changePage('page-login')
      this.showSuccess(`You have logged out`)
    },


    fetchTasks(){
      // Perlu headers
      const access_token = localStorage.getItem('access_token')

      axios({
        url : '/tasks',
        method : 'get',
        headers : { access_token }

      })
      .then(response => {
        // console.log(response)
        this.tasks = response.data
      })
      .catch(err => {
        this.showError(err.response.data.message)
      })
    },

    fetchCategories(){
      // Perlu headers
      const access_token = localStorage.getItem('access_token')

      axios({
        url : '/tasks/cat',
        method : 'get',
        headers : { access_token }
      })
      .then(response => {
        this.categories = response.data
      })
      .catch(err => {
        this.showError(err.response.data.message)
      })
    },

    addTask(payload){
      // console.log('add task from App')
      const access_token = localStorage.getItem('access_token')

      axios({
        url : '/tasks',
        method : 'POST',
        headers : { access_token },
        data : {
          description : payload.description,
          CategoryId : payload.CategoryId
        }
      })
      .then(_=> {
        this.fetchTasks()
        this.showSuccess('Task Added')

      })
      .catch(err => {
        this.showError(err.response.data.message)
      })
    },

    editTask(payload){
      const access_token = localStorage.getItem('access_token')
      axios({
        url : `/tasks/${payload.taskId}`,
        method : 'PUT',
        headers : {
          access_token
        },
        data : {
          description : payload.description
        }
      })
      .then(_=> {
        // this.fetchTasks()
        this.showSuccess('Task edited successfully')
        this.fetchTasks()
      })
      .catch(err => {
        this.fetchTasks()
        this.showError(err.response.data.message)
      })
    },

    changeTaskCategory(payload){
      const { taskId, CategoryId } = payload
      const access_token = localStorage.getItem('access_token')

      const taskIndex = this.tasks.findIndex( el => el.id === taskId)
      const task = this.tasks[taskIndex]

      axios({
        url : `/tasks/${taskId}`,
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
        this.showError(err.response.data.message)
      })

    },


    deleteTask(payload){
      const access_token = localStorage.getItem('access_token')

      axios({
        url : `/tasks/${payload.taskId}`,
        method : 'DELETE',
        headers : {
          access_token
        }
      })
      .then(_=> {
        this.fetchTasks()
        this.showSuccess(`Task deleted`)

      })
      .catch(err => {
        this.showError(err.response.data.message)
      })

    },

    showError(message){
      // this.$vToastify.error(message);
      this.$toast(message, {
        className : [ 'et-alert', 'my-toast' ],
        horizontalPosition : 'center',
        duration : 3000,
        transition : 'slide-down'
      })
      // this.$alert(message, 'ERROR', 'error')
    },

    showSuccess(message){
      // this.$vToastify.success(message);
      this.$toast(message, {
        className : [ 'et-info', 'my-toast' ],
        horizontalPosition : 'center',
        duration : 3000,
        transition : 'slide-down'
      })
    }

  },
  components : {
    LoginPage, 
    RegisterPage, 
    HomePage,
    axios
  },
  
  created() {
    const token = localStorage.getItem('access_token')

    if(token){
      this.pageName = 'page-home'
      this.fetchTasks()
      this.fetchCategories()
      
    } else {

    }
    // console.log(' from created ')
  },

  mounted(){

  }


}
</script>

<style>
.my-toast{
  width : 400px;
  text-align: center;
  font-weight: bold;
  font-size : 1.5rem;
}

  
</style>