<template>
  <section>
    <RegisterPage
      v-if="pageName === 'register-page'"
      @showLogin="changePage"
      @register="register"
    ></RegisterPage>
    <LoginPage
      v-else-if="pageName === 'login-page'"
      @showRegister="changePage"
      @login="login"
    ></LoginPage>
    <HomePage
      v-else-if="pageName === 'home-page'"
      :userInfo="loggedInUser"
      :isEditUsername="isEditUsername"
      @showEditUsername="showEditUsername"
    ></HomePage>
  </section>
</template>

<script>
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      msg: "Hello world",
      pageName: "",
      loggedInUser: null,
      isEditUsername: false,
    };
  },
  components: {
    RegisterPage,
    LoginPage,
    HomePage,
  },
  methods: {
    changePage(name) {
      this.pageName = name;
    },
    register(payload) {
      const { first_name, last_name, email, password } = payload;
      axios({
        url: "/register",
        method: "post",
        data: {
          first_name,
          last_name,
          email,
          password,
        },
      })
        .then(({ data }) => {
          this.pageName = "login-page";
          console.log(data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    login(payload) {
      const { email, password } = payload;
      axios({
        url: "/login",
        method: "post",
        data: {
          email,
          password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.pageName = "home-page";
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    afterLogin() {
      this.pageName = "home-page";
      this.fetchUserProfile();
    },
    fetchUserProfile() {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: "/user",
        method: "get",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.loggedInUser = data;
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    showEditUsername() {
      this.isEditUsername = true;
    },
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.afterLogin();
    } else {
      this.pageName = "login-page";
    }
  },
};
</script>

<style>
</style>