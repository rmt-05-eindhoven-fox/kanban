<template>
    <div>
    <LoginPage  
      v-if="page == 'Login-Page'"
      @login="login"
      @loginGoogle="loginGoogle"
      @toSignUp="toSignUp"
    ></LoginPage>

    <SignupPage 
      v-else-if="page == 'Signup-Page'"
      @signUp="signUp"
      @toLogin="toLogin"
    ></SignupPage>

    <KanbanPage 
      v-else-if="page == 'Kanban-Page'"
      :cards="cards"
      :tasks="tasks"
      @logout="logout"
      @addTask="addTask"
      @deleteTask="deleteTask"
      @updateTask="updateTask"
    ></KanbanPage>
    </div>
</template>

<script>
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import KanbanPage from "./components/KanbanPage"
import axios from './config/axios'
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello world',
      page: 'Login-Page',
      cards: [
        { "id": 1,
          "type": "Backlog",
          "color": "#f37663"
        },
        { "id": 2,
          "type": "Todo",
          "color": "#ca3287"
        },
        { "id": 3,
          "type": "Doing",
          "color": "#30c39e"
        },
        { "id": 4,
          "type": "Done",
          "color": "#a027b8"
        }
      ],
      tasks: [],
      deleteEdit: null
    };
  },
  components: {
    LoginPage,
    SignupPage,
    KanbanPage
  },
  methods: {
    logout(name) {
      this.page = name
      localStorage.removeItem("access_token");
    },
    login(user) {
      axios({
        url: "/login",
        method: "post",
        data: {
          email: user.email,
          password: user.password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.page = "Kanban-Page";
          this.fetchTasks()
        })
        .catch((err) => {
          console.log(err.response);
        });
      },
      
    toSignUp() {
      this.page = 'Signup-Page'
    },
    toLogin(){
      this.page='Login-Page'
    },

    loginGoogle(google_token) {
      axios({
        url: "/googleLogin",
        method: "post",
        data: {
          google_token
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.page = "Kanban-Page";
          this.fetchTasks()
        })
        .catch((err) => {
          console.log(err.response);
        });
      },

    signUp(newUser){
      axios({
        url: '/signup',
        method: 'post',
        data: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          password: newUser.password
        }
      })
        .then(({ data }) => {
          // console.log(data, "<<<< AING DARI APP")
          this.page = "Login-Page";
        }).catch(err => {
          console.log(err.response)
        })
    }
    ,
    fetchTasks() {
      const access_token = localStorage.getItem("access_token");
      // console.log(access_token,"<<<<<<< TOKEN WOI")
      axios({
        url: '/tasks',
        method:'get',
        headers: {
            access_token
        }
      })
        .then(({data}) => {
          this.tasks = data
        }) .catch(err => {
          console.log(err.response)
        })
    },
    addTask(task) {
      // console.log(task);
      const access_token = localStorage.getItem("access_token");
      axios({
        url: '/tasks',
        method:'post',
        data: {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          CategoryId: task.CategoryId
        },
        headers: {
            access_token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.page = "Kanban-Page";
        this.fetchTasks()
      }).catch(err => {
        console.log(err.response)
      })
    },

    deleteTask(id) {
      // console.log(task);
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${id}`,
        method:'delete',
        headers: {
            access_token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.page = "Kanban-Page";
        this.fetchTasks()
      }) .catch(err => {
        console.log(err.response)
      })
    },

    updateTask(task) {
      // console.log(task);
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${task.id}`,
        method:'put',
        data: {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
        },
        headers: {
            access_token
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.page = "Kanban-Page";
        this.fetchTasks()
      }).catch(err => {
        console.log(err.response)
      })
    },
  }, 
  
  created(){
    // this.fetchTasks()
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.page = "Kanban-Page";
      this.fetchTasks()
    } else {
      this.page = "Login-Page";
    }
  },
};
</script>

<style scoped>
</style>