<template>
  <div>
    <Gate
      v-if="pageName == 'gate'"
      @register="register"
      @login="login"
      @loginGoogle="loginGoogle"
    >
    </Gate>

    <HomePage
      v-else-if="pageName == 'homePage'"
      :categories="categories"
      :tasks="tasks"
      :namaUser="namaUser"
      @changePage="changePage"
      @toUpdateForm="toUpdateForm"
      @deleteTask="deleteTask"
      @signOut="signOut"
    >
    </HomePage>

    <AddPage
      @addTask="addTask"
      @changePage="changePage"
      v-else-if="pageName == 'addPage'"
      :IdUser="IdUser"
    ></AddPage>

    <EditPage
      v-else-if="pageName == 'editPage'"
      :tasksDetail="tasksDetail"
      @updateTask="updateTask"
    ></EditPage>
  </div>
</template>

<script>
import axios from "./config/axios";
import HomePage from "./views/homePage";
import Gate from "./views/gate";
import AddPage from "./views/addPage";
import EditPage from "./views/editPage";
export default {
  name: "app",
  components: {
    HomePage,
    Gate,
    AddPage,
    EditPage,
  },
  data() {
    return {
      pageName: "homePage",
      subPageName: "",
      categories: [
        {
          id: 1,
          category: "Back-Log",
        },
        {
          id: 2,
          category: "To-do",
        },
        {
          id: 3,
          category: "Process",
        },
        {
          id: 4,
          category: "Complete",
        },
      ],
      tasks: [],
      tasksDetail: {},
      namaUser: "",
      IdUser: "",
    };
  },
  methods: {
    login(payload) {
      axios({
        url: "/login",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.id);
          this.namaUser = localStorage.name;
          this.IdUser = localStorage.id;
          this.pageName = "homePage";
          this.fetchTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loginGoogle(idToken) {
      axios({
        url: "/googleLogin",
        method: "post",
        data: {
          idToken,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          this.namaUser = localStorage.name;
          this.pageName = "homePage";
          this.fetchTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register(payload) {
      axios({
        url: "/register",
        method: "post",
        data: payload,
      })
        .then(() => {
          console.log("berhasil register");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signOut() {
      localStorage.removeItem("token");
      this.pageName = "gate";
    },
    fetchTask() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "/tasks",
        headers: {
          token,
        },
      })
        .then(({ data }) => {
          this.tasks = data;
          console.log(data, "<<<< data fetch");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changePage(pageName) {
      this.pageName = pageName;
      console.log(pageName);
    },
    toUpdateForm(payload) {
      this.changePage("editPage");
      this.tasksDetail = payload;
      console.log(this.tasksDetail.title);
    },
    addTask(newTask) {
      axios({
        url: "/tasks",
        method: "POST",
        data: {
          title: newTask.title,
          CategoryId: newTask.CategoryId,
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.fetchTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTask(payload) {
      console.log(payload.id);
      const token = localStorage.token;
      console.log(token);
      axios({
        url: `tasks/${payload.id}`,
        method: "put",
        data: {
          title: payload.title,
          CategoryId: payload.CategoryId,
        },
        headers: {
          token,
        },
      })
        .then(() => {
          this.pageName = "homePage";
          this.fetchTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTask(payload) {
      axios({
        url: `/tasks/${payload}`,
        method: "delete",
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          this.fetchTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (!localStorage.token) {
      this.pageName = "gate";
    } else {
      this.pageName = "homePage";
      this.namaUser = localStorage.name;
      this.fetchTask();
    }
  },
};
</script>

<style>
</style>