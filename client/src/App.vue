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
      @editPage="editPage"
      @deleted="deleteTask"
      :user="user"
    ></Content>
    <AddContent v-else-if="pageName == 'add'" @addTask="addTask"></AddContent>
    <EditContent
      v-else-if="pageName == 'edit'"
      :detailTask="detailTask"
      @editTask="editTask"
    ></EditContent>
    <NotFound v-else></NotFound>
  </div>
</template>

<script>
import LandingPage from "./components/LandingPage";
import Content from "./components/Content";
import AddContent from "./components/AddContent";
import EditContent from "./components/EditContent";
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
          name: "Doing",
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
      detailTask: null,
      user: localStorage.getItem("email"),
    };
  },
  components: {
    LandingPage,
    Content,
    AddContent,
    EditContent,
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
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.email);
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
          this.task = res.data;
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
        .then((res) => {
          this.checkLogin();
        })
        .catch((err) => {});
    },
    editPage(payload) {
      this.pageName = payload.pageName;
      this.detailTask = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        category: payload.category,
      };
    },
    editTask(payload) {
      const id = +payload.id;
      const editData = {
        title: payload.title,
        description: payload.description,
        category: payload.category,
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
        .then((res) => {
          this.checkLogin();
        })
        .catch((err) => {});
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: "/kanban/" + id,
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
};
</script>

<style>
</style>