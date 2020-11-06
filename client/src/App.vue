<template>
  <div>
    <LoginPage
      v-if="pageName == 'login-page'"
      @googleLogin="googleLogin"
      @login="login"
      @changePage="changePage"
    ></LoginPage>
    <RegisterPage
      v-else-if="pageName == 'register-page'"
      @register="register"
      @changePage="changePage"
    ></RegisterPage>
    <HomePage
      @editTask="editTask"
      @addTask="addTask"
      @updateCategory="updateCategory"
      @deleteTask="deleteTask"
      @logout="logout"
      :task="task"
      :category="category"
      v-else-if="pageName == 'home-page'"
      @fetchTask="fetchTask"
    ></HomePage>
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import Swal from "sweetalert2";
import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      pageName: "login-page",
      task: [],
      category: [
        {
          category: "backlog",
        },
        {
          category: "product",
        },
        {
          category: "development",
        },
        {
          category: "done",
        },
      ],
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
  },
  methods: {
    login(payload) {
      axios({
        url: "/login",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("first_name", data.first_name);
          this.$swal(
            "Login Success!",
            `Welcome, ${data.first_name}`,
            "success"
          );
          this.pageName = "home-page";
          this.fetchTask();
        })
        .catch((err) => {
          this.$swal(
            "Error",
            `${err.response.status} ${err.response.data.error.split(",")}`,
            "error" // success,error,warning
          );
        });
    },
    register(payload) {
      axios({
        url: "/register",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          this.$swal(
            "Access Granted!",
            "Register successfully, Please login first!",
            "success"
          );
          this.pageName = "login-page";
        })
        .catch((err) => {
          this.$swal(
            "Error",
            `${err.response.status} ${err.response.data.error.split(",")}`,
            "error"
          );
        });
    },
    changePage(page) {
      this.pageName = page;
    },
    fetchTask() {
      let access_token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.task = data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    logout() {
      this.pageName = "login-page";
      localStorage.clear();
      },
    deleteTask(payload) {
      let access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${payload.idTask}`,
        method: "DELETE",
        headers: {
          access_token,
        },
      })
        .then(() => {
          this.$swal(
            "Delete Task",
            `Delete task with id ${payload.idTask} successfully!`,
            "success"
          );
          this.fetchTask();
        })
        .catch((err) => {
          this.$swal(
            "Delete Task",
            `${err.response.status} ${err.response.data.error.error}`,
            "error"
          );
        });
    },
    updateCategory(payload) {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "patch",
        url: `/tasks/${payload.id}`,
        data: {
          category: `${payload.category}`,
        },
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.fetchTask();
        })
        .catch((err) => {
          this.$swal(
            "Update Category",
            `${err.response.status} ${err.response.data.error.error}`,
            "error"
          );
        });
    },
    addTask(payload) {
      const access_token = localStorage.getItem("access_token");

      axios({
        method: "post",
        url: "/tasks",
        data: {
          title: payload.title,
          tag: payload.tag,
          category: payload.category,
        },
        headers: {
          access_token,
        },
      })
        .then(() => {
          this.$swal("Add Task", `Add task successfully!`, "success");
          this.fetchTask();
        })
        .catch((err) => {
          this.$swal(
            "Add Task",
            `${err.response.status} ${err.response.data.error.error}`,
            "error"
          );
        });
    },
    editTask(payload) {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "put",
        url: `/tasks/${payload.id}`,
        data: {
          title: payload.title,
          tag: payload.tag,
        },
        headers: {
          access_token,
        },
      })
        .then(() => {
          this.$swal("Edit Task", `Edit task successfully!`, "success");
          this.fetchTask();
        })
        .catch((err) => {
          this.$swal(
            "Add Task",
            `${err.response.status} ${err.response.data.error.error}`,
            "error"
          );
        });
    },
    googleLogin(payload) {
      axios({
        method: "post",
        url: "/logingoogle",
        data: {
          email: payload.email,
          google_access_token: payload.google_access_token,
        },
      }).then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("first_name", data.first_name);
        this.$swal("Login Success!", `Welcome, ${data.first_name}`, "success");
        this.pageName = "home-page";
        this.fetchTask();
      });
    },
  },
  created() {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.fetchTask();
      this.pageName = "home-page";
    } else {
      this.pageName = "login-page";
    }
  },
};
</script>

<style>
</style>