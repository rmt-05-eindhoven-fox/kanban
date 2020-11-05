<template>
  <div>
    <LoginPage :logoPng="logoUrl" v-if="pageName == 'login'"></LoginPage>
    <RegisterPage
      :logoPng="logoUrl"
      v-else-if="pageName == 'register'"
    ></RegisterPage>
    <HomePage
      :dataCat="categoryList"
      :logoPng="logoUrl"
      :tasks="dataTasks"
      v-else-if="pageName == 'home'"
    ></HomePage>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import logo from "./assets/logo-kanban@2x.png";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      pageName: "home",
      logoUrl: logo,
      categoryList: [
        {
          category: "Backlog",
        },
        {
          category: "Todo",
        },
        {
          category: "On Going",
        },
        {
          category: "Completed",
        },
      ],
      dataTasks: []
    };
  },
  components: {
    HomePage,
    LoginPage,
    RegisterPage,
  },
  methods: {
    fetchTasks() {
      axios({
        url: "/tasks",
        method: 'get'
      })
      .then(({data}) => {
        console.log(data, "data task");
        this.dataTasks = data
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  },
  created() {
    this.fetchTasks()
  }
};
</script>

<style></style>
