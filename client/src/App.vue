<template>
  <div> 
    <Auth
      v-if="activePage == 'auth-page'"
      @prosesLogin="prosesLogin"
      @prosesRegister="prosesRegister"
      :user="user"
    ></Auth>

    <Home
      v-else-if="activePage == 'home-page'"
      :categories="categories"
      :organizationId="currentOrganizationId"
      @openAddTask="openAddTask"
    >
    </Home>   
    <Modaladd 
    v-if="modalName == 'addTodo'" 
    v-show="showModal"  
    @isDisplayModal="isDisplayModal"
    :payload="payloadAddTask"
    ></Modaladd>
</template>

<script>
// ES6 Modules or TypeScript

import axios from "./config/axios";
import Swal from "sweetalert2";
import Modaladd from "./component/home/add-todo";
import Auth from "./component/auth-page.vue";
import Home from "./component/home-page.vue";

export default {
  name: "App",
  data() {
    return {
      user: {},
      organization: {},
      categories: [],
      activePage: "auth-page",
      // Data Modal Add Task
      modalAddTodo: false,
      showModal: false,
      modalName: "",
      currentOrganizationId: "",
      payloadAddTask: {},
    };
  },

  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.activePage = "home-page";
      this.loadOrganizationById();
    } else {
      this.activePage = "auth-page";
    }
  },

  components: {
    Auth,
    Home,
    Modaladd,
  },

  methods: {
    changeModal(params) {
      this.modalName = params;
    },

    openAddTask(payload) {
      this.payloadAddTask = payload;
      console.log("clicked here");
      this.isDisplayModal(true);
      this.changeModal("addTodo");
      console.log("is here");
    },

    isDisplayModal(params) {
      this.showModal = params;
      this.modalName = "";
      this.modalAddTodo = params;
    },

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

    loadOrganizationById(organizationId = null) {
      // organizations
      organizationId = 1;
      axios({
        url: "organizations/" + organizationId,
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.currentOrganizationId = organizationId;
          // this.organization = data;
          // console.log(data.organization.Categories)
          this.categories = data.organization.Categories;
        })
        .catch((err) => {
          console.log(err.response);
          // this.errorHandler(err, "Register Failed!");
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