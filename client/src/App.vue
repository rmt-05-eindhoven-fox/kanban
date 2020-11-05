<template>
  <div>
    <Auth
      v-if="activePage == 'auth-page'"
      @prosesLogin="prosesLogin"
      @prosesRegister="prosesRegister"
      :user="user"
    ></Auth>

    <Home v v-else-if="activePage == 'home-page'"> </Home>
  </div>
</template>

<script>
// ES6 Modules or TypeScript
import axios from "./config/axios";
import Swal from "sweetalert2";
import Auth from "./component/auth-page.vue";
import Home from "./component/home-page.vue";

export default {
  name: "App",
  data() {
    return {
      user: {},
      organizations: {},
      activePage: "home-page",
    };
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.loadOrganization();
    }
  },

  components: {
    Auth,
    Home,
  },

  methods: {
    prosesLogin(payload) {
      axios({
        url: "login",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          const fullname = data.fullname;
          const access_token = data.access_token;
          this.saveUserInfo({ fullname, access_token });
          this.$swal("Access Granted!", `Welcome, ${fullname}`, "success");
        })
        .catch((err) => {
          this.errorHandler(err, "Access Denied!");
        });
    },

    prosesRegister(payload) {
      axios({
        url: "register",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          this.$swal(
            "Access Granted!",
            "Register successfully, Please login first!",
            "success"
          );
          this.user = data;
        })
        .catch((err) => {
          this.errorHandler(err, "Register Failed!");
        });
    },

    loadOrganization() {
      // organizations
      axios({
        url: "organizations/2",
        method: "get", 
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.organizations = data;
          console.log(data.organizations);
        })
        .catch((err) => {
          this.errorHandler(err, "Register Failed!");
        });
    },

    saveUserInfo(user) {
      localStorage.setItem("fullname", user.fullname);
      localStorage.setItem("access_token", user.access_token);
    },

    errorHandler(err, title) {
      const error = err.response.data;
      let message = "";
      if (Array.isArray(error.message)) {
        message = error.message[0].errors;
      } else {
        message = error.message;
      }
      this.$swal(title, message, "error");
    },
  },
};
</script>

<style>
</style>