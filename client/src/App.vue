<template>
  <div>
    <LandingPage
      v-if="pageName == 'landingPage'"
      @register="register"
      @isLogin="isLogin"
      @logingIn="logingIn"
      :login="login"
    ></LandingPage>
    <Content
      v-else-if="pageName == 'content'"
      @logout="logout"
      @addPage="changePage"
      :category="category"
      :task="task"
    ></Content>
    <AddContent v-else-if="pageName == 'add'" @addTask="addTask"></AddContent>
    <NotFound v-else></NotFound>
  </div>
</template>

<script>
import LandingPage from "./components/LandingPage";
import Content from "./components/Content";
import AddContent from "./components/AddContent";
import NotFound from "./components/NotFound";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      pageName: "landingPage",
      login: true,
      tempGro: [],
      category: [
        {
          name: "Backlog",
          color: "text-center text-white p-2 rounded bg-secondary",
          border: "btn btn-light btn-sm p-0 border border-secondary",
        },
        {
          name: "Todo",
          color: "text-center text-white p-2 rounded bg-primary",
          border: "btn btn-light btn-sm p-0 border border-primary",
        },
        {
          name: "Progress",
          color: "text-center text-white p-2 rounded bg-warning",
          border: "btn btn-light btn-sm p-0 border border-warning",
        },
        {
          name: "Done",
          color: "text-center text-white p-2 rounded bg-success",
          border: "btn btn-light btn-sm p-0 border border-success",
        },
      ],
      task: [],
    };
  },
  components: {
    LandingPage,
    Content,
    AddContent,
    NotFound,
  },
  methods: {
    changePage(name) {
      this.pageName = name;
    },
    isLogin(payload) {
      this.login = payload;
    },
    logingIn(payload) {
      axios({
        method: "POST",
        url: "/login",
        data: payload,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          this.checkLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.clear();
      this.checkLogin();
    },
    register(payload) {
      axios({
        method: "POST",
        url: "/register",
        data: payload,
      })
        .then((res) => {
          this.login = true;
        })
        .catch((err) => {});
    },
    showContent() {
      axios({
        method: "GET",
        url: "/kanban",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.task = res;
        })
        .catch((err) => {});
    },
    addTask(payload) {
      axios({
        method: "POST",
        url: "/kanban",
        data: payload,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => {})
        .catch((err) => {});
    },
    editTask(payload) {
      const id = +payload.id;
      const editData = {
        title: payload.title,
        description: payload.description,
        tag: payload.tag,
      };
      axios({
        method: "PUT",
        url: "/kanban/" + id,
        data: editData,
        headers: {
          token: localStorage.getItem("token"),
          id,
        },
      })
        .then((res) => {})
        .catch((err) => {});
    },
    deleteTask(payload) {
      axios({
        method: "DELETE",
        url: "/kanban/" + payload,
        headers: {
          token: localStorage.getItem("token"),
          id,
        },
      })
        .then((res) => {
          this.showContent();
        })
        .catch((err) => {});
    },
    checkLogin() {
      if (localStorage.token) {
        this.pageName = "content";
        this.showContent();
      } else {
        this.pageName = "landingPage";
      }
    },
  },
  Created() {
    this.checkLogin();
    console.log(localStorage.token);
  },
};
</script>

<style>
</style>