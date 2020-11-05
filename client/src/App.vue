<template>
  <div>
    <Navbar
      v-if="pageName == 'content'"
      @logout="logout"
    ></Navbar>

    <!-- <div 
    v-if="error != ''"
    id="error" class="alert alert-danger" role="alert"></div> -->
    <Login
      v-if="pageName == 'login'"
      @login="login"
      @changePage="changePage"
    ></Login>
    
    <Register
      v-else-if="pageName == 'register'"
      @register="register"
      @changePage="changePage"
    ></Register>

    <HomePage
      v-else-if="pageName == 'content'"
      :categories="categories"
      :tasks="tasks"
      @addTask="addTask"
      @deleteTask="deleteTask"
      @editTask="editTask"
    ></HomePage>

    <!-- <div v-else><h2>Page Not Found</h2></div> -->
  </div>
</template>

<script>
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import axios from './config/axios'
export default {
  name: 'App',
  data() {
    return {
      pageName: 'content',
      categories: [
        {
          name: 'Backlog'
        },
        {
          name: 'Todo'
        },
        {
          name: 'Doing'
        },
        {
          name: 'Finished'
        }
      ],
      tasks: []
    }
  },
  components: {
    HomePage,
    Login,
    Register,
    Navbar
  },
  methods: {
    changePage(name) {
      this.pageName = name
    },
    login (user) {
      axios({
        url: '/user/login',
        method: 'POST',
        data: {
          email: user.email,
          password: user.password
        }
      })
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data.access_token)
        this.afterLogin()
      })
      .catch(err => {
        console.log(err.response, '<<<<<<<< err dari login');
        // this.showError (err.message);
      })
    },
    register (user) {
      axios({
        url: '/user/register',
        method: 'POST',
        data: {
          email: user.email,
          password: user.password
        }
      })
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('token', data.access_token)
        this.afterLogin()
      })
      .catch(err => {
        console.log(err.response, '<<<<<<<< err dari register');
      })
    },
    fetchTasks () {
      axios({
        url: '/task',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.tasks = data;
      })
      .catch(err => {
        console.log(err.response,  '<<<<<<<<<< err dari fetchTask')
      })
    },
    addTask (addTask) {
      axios({
        url: '/task',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('token')
        },
        data: {
          title: addTask.title,
          description: addTask.description,
          status: addTask.status
        }
      })
      .then(({ data }) => {
        this.afterLogin()
      })
      .catch(err => {
        console.log(err.response, '<<<<<<< err dari addTask')
      })
    },
    deleteTask (id) {
      axios({
        url: `/task/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(data => {
        this.afterLogin()
      })
      .catch(err => {
        console.log(err.response, '<<<<<<< err dari deleteTask')
      })
    },
    editTask (edit) {
      axios({
        url: `/task/${edit.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('token')
        },
        data: {
          title: edit.title,
          description: edit.description
        }
      })
      .then(data => {
        this.afterLogin()
      })
      .catch(err => {
        console.log(err.response, '<<<<<<< err dari editTask')
      })
    },
    afterLogin () {
      this.fetchTasks()
      this.changePage('content')
    },
    afterLogout () {
      this.changePage('login')
    },
    logout () {
      localStorage.removeItem('token')
      this.afterLogout()
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.fetchTasks()
      this.changePage('content')
    }
    else {
      this.changePage('login')
    }
  }

}
</script>

<style>

</style>