<template>
<div>
 <loginPage v-if="pageName == 'login-page'" @login="login" @toRegisterPage="toRegisterPage" @onSignIn="onSignIn"></loginPage>
 <RegisterPage v-else-if="pageName == 'register-page'" @toLoginPage="toLoginPage" @register="register" @onSignIn="onSignIn"></RegisterPage>
 <KanbanHome v-else-if="pageName == 'home-page'" :data="categories" :tasks="tasks" @toAddPage="toAddPage" @toLoginPage="toLoginPage" @toEditPage="toEditPage" @logout="logout" @deleteTask="deleteTask"></KanbanHome>
 <edit-page v-else-if="pageName == 'edit-page'" @toHomePage="toHomePage" @editTask="editTask" :detailTask="detailTask"></edit-page>
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
   pageName: "login-page",
   categories: ["Backlog", "Todo", "Doing", "Done"],
   tasks: [],
   detailTask: null
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
  toEditPage(payload) {
   this.pageName = payload.pageName;
   this.detailTask = {
    title: payload.task.title,
    description: payload.task.title,
    category: payload.task.category,
    taskId: payload.task.id
   }
  },
  toRegisterPage(payload) {
   this.pageName = payload;
  },
  toHomePage(payload) {
   this.pageName = payload;
  },
  fetchTask() {
   const token = localStorage.getItem("token");
   const id = +localStorage.getItem("id");

   axios({
     url: '/tasks',
     method: "get",
     headers: {
      access_token: token
     }
    })
    .then(({
     data
    }) => {
     this.tasks = data.foundAllTask
    })
    .catch(err => {
     res.send(err.response.data.msg);
    })
  },
  addTask(payload) {
   const id = +localStorage.getItem("id");
   const token = localStorage.getItem("token");

   axios({
     url: '/tasks',
     method: "post",
     headers: {
      access_token: token
     },
     data: {
      title: payload.title,
      description: payload.description,
      category: payload.category,
      UserId: id
     },
    })
    .then(({
     data
    }) => {
     console.log(data.msg)
     this.fetchTask();
     this.pageName = 'home-page'
     Swal.fire({
      icon: "success",
      title: "Success",
      text: data.msg,
     });
    })
    .catch(err => {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.msg,
     });
    })
  },
  logout(payload) {
   Swal.fire({
    title: "Are you sure?",
    text: "I MEAN IT, ARE YOU SURE?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
   }).then((result) => {
    if (result.isConfirmed) {
     this.pageName = 'login-page';
     localStorage.clear();
     var auth2 = gapi.auth2.getAuthInstance();
     auth2.signOut().then(function () {
      console.log("User signed out.");
     });
     Swal.fire("Logged out!", "See you later, babai.", "success");
    } else {
     this.pageName = 'home-page'
    }
   });
  },

  editTask(payload) {
   const token = localStorage.getItem("token");

   axios({
     url: `/tasks/${payload.taskId}`,
     method: "put",
     headers: {
      access_token: token
     },
     data: {
      title: payload.title,
      description: payload.description,
      category: payload.category,
     },
    })
    .then(({
     data
    }) => {
     this.fetchTask();
     this.pageName = 'home-page'
     Swal.fire({
      icon: "success",
      title: "Success",
      text: data.msg,
     });
    })
    .catch(err => {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.msg,
     });
    })
  },

  deleteTask(payload) {
   const token = localStorage.getItem("token");

   axios({
     url: `/tasks/${payload}`,
     method: "delete",
     headers: {
      access_token: token
     },
    })
    .then(({
     data
    }) => {
     this.fetchTask();
     this.pageName = 'home-page'
     Swal.fire({
      icon: "success",
      title: "Success",
      text: data.msg,
     });
    })
    .catch(err => {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.msg,
     });
    })
  },

  login(payload) {
   const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
     toast.addEventListener("mouseenter", Swal.stopTimer);
     toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
   });

   axios({
     url: '/users/login',
     method: 'post',
     data: {
      email: payload.email,
      password: payload.password
     }
    })
    .then(({
     data
    }) => {
     localStorage.setItem("token", data.access_token);
     localStorage.setItem("id", data.id);
     this.fetchTask();
     this.pageName = 'home-page';
     Toast.fire({
      icon: "success",
      title: `Log in successfully`,
     });
    })
    .catch(err => {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.msg,
     });
    })
  },

  onSignIn(googleUser) {
   const googleToken = googleUser.getAuthResponse().id_token;

   axios({
     method: "POST",
     url: "users/googleLogin",
     data: {
      googleToken,
     },
    })
    .done((response) => {
     localStorage.setItem("token", response.access_token);
     localStorage.setItem("id", response.id);
     this.fetchTask();
     this.pageName = 'home-page';
     Toast.fire({
      icon: "success",
      title: `Log in successfully with Google`,
     });
    })
    .fail(err => {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.msg,
     });
    })
  },

  register(payload) {
   axios({
     url: '/users/register',
     method: 'post',
     data: {
      email: payload.email,
      password: payload.password
     }
    })
    .then((data) => {
     this.pageName = 'login-page';
     Swal.fire({
      icon: "success",
      title: "Success",
      text: "I guess, that login button is kinda thirsty now..",
     });
    })
    .catch(err => {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.msg,
     });
    })
  },
  created() {
   this.fetchTask();
  },
 }
};
</script>

<style scoped></style>
