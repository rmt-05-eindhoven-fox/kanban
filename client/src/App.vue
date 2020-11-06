<template>
  <div>
    <!-- Login Page -->
    <LoginPage
      v-if="pageName == 'login-page'"
      @login="login"
      @changePage="changePage"
      @toRegisterPage="toRegisterPage"
    ></LoginPage>
    <!-- Register Page -->
    <RegisterPage
      v-if="pageName == 'register-page'"
      @register="register"
      @changePage="changePage"
      @toLoginPage="toLoginPage"
    ></RegisterPage>
    <!-- Home Page -->
    <HomePage
      v-if="pageName == 'home-page'"
      :categories="categories"
      :tasks="tasks"
      @deleteTask="deleteTask"
      @toLoginPage="toLoginPage"
      @signOut="signOut"
      @addTask="addTask"
      @editTask="editTask"
    >
    </HomePage>
    <section></section>
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import HomePage from "./components/HomePage.vue";
import axios from "./config/axios.js";
import Swal from "sweetalert2";

export default {
  name: "App",
  data() {
    return {
      msg: "App is running",
      pageName: "home-page",
      categories: [
        {
          category: "Backlog",
        },
        {
          category: "Todo",
        },
        {
          category: "Doing",
        },
        {
          category: "Done",
        },
      ],
      tasks: [],
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
  },
  methods: {
    changePage(name) {
      this.pageName = name;
    },
    toLoginPage(payload) {
      this.pageName = payload.pageName;
    },
    login(payload) {
      axios({
        url: "/login",
        method: "POST",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(({ data }) => {
          const token = data.access_token;
          localStorage.setItem("access_token", token);
          this.fetchTasks();
          this.pageName = "home-page";
          this.$swal("Login Success", `Welcome back ${data.name}`, "success");
        })
        .catch((err) => {
          console.log(err.response);
          this.$swal("Error", `${err.response.data.error}`, "error");
        });
    },
    toRegisterPage(payload) {
      this.pageName = payload.pageName;
    },
    register(payload) {
      axios({
        url: "/register",
        method: "POST",
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        },
      })
        .then(({ data }) => {
          const token = data.access_token;
          localStorage.setItem("access_token", token);
          this.pageName = "login-page";
        })
        .catch((err) => {
          this.$swal("Oops!", `${err.response.data.error}`, "error");
        });
    },
    signOut() {
      console.log("Sign out is success!");
      localStorage.clear();
      this.pageName = "login-page";
    },
    fetchTasks() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          token,
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err.response, "error saat fetching");
        });
    },
    deleteTask(payload) {
      const token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${payload.id}`,
        method: "DELETE",
        headers: {
          token,
        },
      })
        .then((response) => {
          console.log("Delete task is successful");
          console.log(payload);
          this.$swal(
            "Success!",
            `You just deleted Task: "${payload.title}" from ${payload.category}`,
            "success"
          );
          this.fetchTasks();
        })
        .catch((err) => {
          this.$swal(
            "Sorry!",
            `You can't delete other people's task!`,
            "error"
          );
        });
    },
    addTask(payload) {
      const token = localStorage.getItem("access_token");

      axios({
        url: "/tasks",
        method: "POST",
        data: {
          title: payload.title,
          tag: payload.tag,
          category: payload.category,
        },
        headers: {
          token,
        },
      })
        .then(({ data }) => {
          console.log("Add new Task is succeed!");
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    editTask(payload) {
      console.log(payload, "<<<<<payload di App")
      const token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${payload.id}`,
        method: "PUT",
        data: {
          title: payload.title,
          tag: payload.tag,
        },
        headers: {
          token,
        },
      })
        .then(({ data }) => {
          this.fetchTasks();
          console.log("Edit Task is succeed!");
        })
        .catch((err) => {
          this.$swal("Sorry!", `You can't edit other people's task!`, "error");
        });
    },
  },
  created() {
    const token = localStorage.getItem("access_token");

    if (token) {
      this.fetchTasks();
      this.pageName = "home-page";
    } else if (!token) {
      this.pageName = "login-page";
    }
  },
};
</script>

<style>
</style>