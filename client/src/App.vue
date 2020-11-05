<template>
  <div>
    <LoginPage v-if="pageName == 'login'"></LoginPage>
    <RegisterPage v-else-if="pageName == 'register'"></RegisterPage>
    <HomePage v-else-if="pageName == 'board'"></HomePage>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
export default {
  name: "App",
  data() {
    return {
      pageName: "board",
    };
  },
  components: {
    HomePage,
    LoginPage,
    RegisterPage,
  },
};
</script>

<style></style>
