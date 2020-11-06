<template>
<div>
 <loginPage v-if="pageName == 'login-page'" @login="login"></loginPage>
 <RegisterPage v-else-if="pageName == 'register-page'" @toLoginPage="toLoginPage"></RegisterPage>
 <KanbanHome v-else-if="pageName == 'home-page'" :data="categories" :tasks="tasks" @toAddPage="toAddPage" @toLoginPage="toLoginPage"></KanbanHome>
 <edit-page v-else-if="pageName == 'edit-page'" @toHomePage="toHomePage"></edit-page>
 <add-page v-else-if="pageName == 'add-page'" @addTask="addTask" @toHomePage="toHomePage"></add-page>
</div>
</template>

<script>
import KanbanHome from "./components/KanbanHome.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import EditPage from "./components/EditPage.vue";
import AddPage from "./components/AddPage.vue";
import axios from "./config/axios"

export default {
 name: "KANBAN",
 data() {
  return {
   pageName: "home-page",
   categories: ["Backlog", "Todo", "Doing", "Done"],
   tasks: []
  };
 },
 components: {
  LoginPage,
  RegisterPage,
  KanbanHome,
  EditPage,
  AddPage,
 },
 methods: {
  toAddPage(payload) {
   this.pageName = payload;
  },
  toLoginPage(payload) {
   this.pageName = payload;
  },
  toHomePage(payload) {
   this.pageName = payload;
  },
  fetchTask() {
   axios({
     url: '/tasks',
     method: "get",
    })
    .then(({
     data
    }) => {
     this.tasks = data
    })
    .catch(err => {
     console.log(err.response)
    })
  },
  addTask(payload) {
   axios({
     url: '/tasks',
     method: "post",
     data: {
      title: payload.title,
      description: payload.description,
      category: payload.category,
     }
    })
    .then(({
     data
    }) => {
     console.log(data)
     this.fetchTask();
     this.pageName = 'home-page'
    })
    .catch(err => {
     console.log(err.response)
    })
  },
  login(payload) {
   axios({
     url: '/users/login',
     method: 'post',
     data: {
      email: payload.email,
      password: payload.password
     }
    })
    .then((data) => {
     localStorage.setItem("token", data.access_token);
     localStorage.setItem("id", data.id);
     this.fetchTask();
     this.pageName = 'home-page';
    })
    .catch(err => {
     console.log(err.response.data)
    })
  },
  created() {
   this.fetchTask();
  },
 }
};
</script>

<style scoped></style>
