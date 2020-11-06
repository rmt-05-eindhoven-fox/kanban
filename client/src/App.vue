<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <!-- Navbar -->
    <Navbar
      v-if="pageName != 'login-page' && pageName != 'register-page'"
      @logout='logout'
      :logged_first_name='logged_first_name'
      :logged_last_name='logged_last_name'
      >
    </Navbar>
    <!-- Register -->
    <RegisterPage
      v-if="pageName === 'register-page'"
      @changePage='changePage'
      @register='register'
      >

    </RegisterPage>
    <!-- Login -->
    <LoginPage 
      v-if="pageName === 'login-page'"
      @changePage="changePage"
      @login='login'
      @OnGoogleAuthSuccess='OnGoogleAuthSuccess'
      @OnGoogleAuthFail='OnGoogleAuthFail'
      >

    </LoginPage>
    <!-- AddTask -->
    <AddTaskPage
      v-if="pageName === 'add-page'"
      :dataAddTask="dataAddTask"
      @changePage="changePage"
      @addTask="addTask"
      >
    </AddTaskPage>
    <!-- EditTask -->
    <EditTaskPage
      v-if="pageName === 'edit-page'"
      :dataEditTask="dataEditTask"
      @changePage="changePage"
      @editTask="editTask"
      >
    </EditTaskPage>
    <!-- Main -->
    <MainPage 
      v-if="pageName === 'main-page'"
      :categories='categories'
      :tasks='tasks'
      @logout="logout"
      @toAddPage="toAddPage"
      @toEditPage="toEditPage"
      @deleteTask="deleteTask"
      >
    </MainPage>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MainPage from './components/MainPage'
import AddTaskPage from './components/AddTaskPage'
import EditTaskPage from './components/EditTaskPage'
import axios from './config/axios'

export default {
  name: 'App',
  data() {
    return {
      message: 'Hello Vuee!',
      pageName: 'login-page',
      access_token: '',
      logged_first_name: '',
      logged_last_name: '',
      dataAddTask: null,
      dataEditTask: null,
      categories: [
        {
          name: 'Backlog',
          color: 'bg-warning'
        },
        {
          name: 'Todo',
          color: 'bg-info'
        },
        {
          name: 'Doing',
          color: 'bg-primary'
        },
        {
          name: 'Done',
          color: 'bg-success'
        }
      ],
      tasks: []
    }
  },
  components: {
    Navbar,
    LoginPage,
    RegisterPage,
    MainPage,
    AddTaskPage,
    EditTaskPage
  },
  methods:{
    fetchTasks() {
      console.log('inside fetch task');
      axios({
        method: 'get',
        url: '/tasks',
        headers: {
          access_token: this.access_token
          }
      })
        .then(({data}) => {
          this.tasks = data
          console.log('we get the tasks');
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    changePage(name) {
      this.pageName = name
    },
    register(payload) {
      const { email, password, first_name, last_name } = payload
      // console.log(email, password, first_name, last_name);
      axios({
        url: '/register',
        method: 'post',
        data: {
          email,
          password,
          first_name,
          last_name
        }
      })
        .then(({data}) => {
          // console.log(data);
          this.changePage('login-page')
          Swal.fire({
            icon: 'success',
            title: 'Register Successfull',
            text: `${data.email} registered succesfully!`
          })
        })
        .catch(error => {
         const err = error.response.data.msg
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err
          })
        })
    },
    login(payload) {
      // console.log(payload);
      const { email, password } = payload
      // console.log(email, password);
      axios({
        url: '/login',
        method: 'post',
        data: {
          email,
          password
        }
      })
        .then(({data}) => {
          const access_token = data.access_token
          localStorage.setItem('logged_first_name', data.first_name)
          localStorage.setItem('logged_last_name', data.last_name)
          localStorage.setItem('access_token', access_token)
          this.access_token = access_token
          this.logged_first_name = localStorage.getItem('logged_first_name')
          this.logged_last_name = localStorage.getItem('logged_last_name')
          this.fetchTasks()
          this.changePage('main-page')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Successfull',
            text: `Welcome ${this.logged_first_name}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error => {
          // console.log(error.response.data);
          const err = error.response.data.msg
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err
          })
        })
    },
    logout(){
      Swal.fire({
        title: `Are you sure want to logout ${this.logged_first_name}?
          :(`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: `Logout`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.clear()
          this.logged_first_name = ''
          this.logged_last_name = ''
          this.changePage('login-page')
          Swal.fire('Logged out!', '', 'success')
        }
      })
    },
    checkLogin() {
      const access_token = localStorage.getItem('access_token')
      this.logged_first_name = localStorage.getItem('logged_first_name')
      this.logged_last_name = localStorage.getItem('logged_last_name')
      if (access_token) {
        this.access_token = access_token
        this.changePage('main-page')
        this.fetchTasks()
      } else {
        this.changePage('login-page')
      }
    },
    toAddPage(payload) {
      this.dataAddTask = {
        category: payload.category
      }
      this.changePage(payload.page)
    },
    addTask(payload) {
      const { title, category } = payload
      // console.log(title, category, 'app');
      axios({
        url: '/tasks',
        method: 'post',
        headers: {
          access_token: this.access_token
        },
        data: {
          title,
          category
        }
      })
        .then(({data}) => {
          console.log(data);
          this.fetchTasks()
          this.changePage('main-page')
          Swal.fire('Add Task Successfull','Task added succesfully!', 'success')
        })
        .catch(error => {
          // console.log(error.response.data);
          const err = error.response.data.msg
          Swal.fire('Error',err, 'error')
        })
    },
    toEditPage(payload) {
      this.dataEditTask = {
        id: payload.id,
        title: payload.title,
        category: payload.category,
      }
      this.changePage(payload.page)
    },
    editTask(payload) {
      const { id, title, category } = payload
      axios({
        url: `/tasks/${id}`,
        method: 'put',
        headers: {
          access_token: this.access_token
        },
        data: {
          title,
          category
        }
      })
        .then(({data}) => {
          // console.log(data);
          Swal.fire('Edit Successfull','Edited in succesfully!', 'success')
          this.fetchTasks()
          this.changePage('main-page')
        })
        .catch(error => {
          const err = error.response.data.msg
          Swal.fire('Error',err, 'error')
        })
    },
    deleteTask(payload) {
      const {id} = payload
      Swal.fire({
        title: `Delete`,
        text: `Are you sure want to delete this Task?
          :(`,
        icon: 'warning',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        showCancelButton: true,
        confirmButtonText: `Delete`
      })
      .then((result) => {
        if (result.isConfirmed) {
          return axios({
            url: `/tasks/${id}`,
            method: 'delete',
            headers: {
              access_token: this.access_token
            }
          })
          Swal.fire('Task deleted succesfully!', '', 'success')
        }
      })
      .then((response) => {
        this.fetchTasks()
        this.changePage(payload.page)
      })
      .catch(error => {
        const err = error.response.data.msg
        Swal.fire('Error',err, 'error')
      })
    },
    OnGoogleAuthSuccess (idToken) {
      // console.log(idToken, 'mantul main')
      const access_token = idToken
      axios({
        url: '/loginGoogle',
        method: 'post',
        data: {
          access_token
        }
      })
      .then(({data}) => {
        const access_token = data.access_token
        localStorage.setItem('logged_first_name', data.first_name)
        localStorage.setItem('logged_last_name', data.last_name)
        localStorage.setItem('access_token', access_token)
        this.access_token = access_token
        this.logged_first_name = localStorage.getItem('logged_first_name')
        this.logged_last_name = localStorage.getItem('logged_last_name')
        this.fetchTasks()
        this.changePage('main-page')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfull',
          text: `Welcome ${this.logged_first_name}`,
          showConfirmButton: false,
          timer: 3000
        })
      })
      .catch(error => {
        const err = error.response.data.msg
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err
        })
      }) 
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error, 'err main')
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Google login failed!'
      })
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style>

</style>