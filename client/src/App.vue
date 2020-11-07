<template>
  <div>
    <section id="main">
      <Homepage
        :categories="titles"
        :tasks="tasks"
        @signout="signOut"
        @changePage="changePage"
        @fetchTask="fetchTask"
        @editTask="editTask"
        v-if="pageName == 'home-page'"
      ></Homepage>
      <RegisterPage @register="register" v-else-if="pageName == 'register-page'"></RegisterPage>
      <LoginPage @login="login" v-else-if="pageName == 'login-page'" @changePage="changePage"></LoginPage>
      <AddForm v-else-if="pageName == 'add-page'" @changePage="changePage" @fetchTask="fetchTask"></AddForm>
      <EditForm
        v-else-if="pageName == 'edit-page'"
        :task="currentTask"
        @changePage="changePage"
        @fetchTask="fetchTask"
      ></EditForm>

      <section v-else>
        <h1>Page not found !</h1>
      </section>
    </section>
  </div>
</template>



<script>
import Homepage from "./components/Homepage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      msg: "KanbanApp",
      pageName: "login-page",
      titles: [
        {
          title: "Backlog"
        },
        {
          title: "Todo"
        },
        {
          title: "Doing"
        },
        {
          title: "Completed"
        }
      ],
      tasks: [],
      currentTask: {}
    };
  },
  components: {
    Homepage,
    RegisterPage,
    LoginPage,
    AddForm,
    EditForm
  },

  methods: {
    checkLogin() {
      if (localStorage.tokenAccess) {
        this.changePage("home-page");
        this.fetchTask();
      } else {
        this.changePage("login-page");
      }
    },
    login(payload) {
      //console.log(payload.email, '<<<ini dari app')
      axios({
        url: "/login",
        method: "post",

        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          //console.log(response, 'ini dapet')
          this.changePage("home-page");
          const token = response.data.tokenAccess;
          //console.log(token)
          localStorage.setItem("tokenAccess", token);
        })
        .catch(err => {
          console.log(err, "ini eror");
          //this.changePage('')
        });
    },
    changePage(name) {
      this.pageName = name;
    },
    register(payload) {
      //console.log(payload, 'ada data')
      axios({
        url: "/register",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          //console.log(response, 'yeay dapet response')
          this.changePage("login-page");
        })
        .catch(err => {
          console.log(err, "yah eror");
        });
    },
    signOut() {
      localStorage.removeItem("tokenAccess");
      this.changePage("login-page");
    },
    fetchTask() {
      axios({
        url: "/todos",
        method: "get",
        headers: {
          token: localStorage.tokenAccess
        }
      })
        .then(({ data }) => {
          this.tasks = data.todo;
        })
        .catch(err => {
          console.log(err.response, "<<<< error fetch");
        });
    },
    editTask(task) {
      this.currentTask = task;
      this.changePage("edit-page");
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style>
</style>