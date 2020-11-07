<template>
  <div class="authentication">
    <!-- riyan -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-sm-12">
          <!-- Login / Register Page -->
          <Login
            v-if="form == 'auth-login'"
            @changeForm="changeForm"
            @prosesLogin="prosesLogin"
            @googleLogin="googleLogin"
          ></Login>
          <Register
            v-else-if="form == 'auth-register'"
            @changeForm="changeForm"
            @prosesRegister="prosesRegister"
            :user="user"
          ></Register>

          <div class="copyright text-center">
            Kanban &copy;
            {{ thisYear }}
          </div>
        </div>
        <div class="col-lg-8 col-sm-12">
          <div class="card">
            <img src="./images/kanban.png" alt="Sign In" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./auth/login.vue";
import Register from "./auth/register.vue";

export default {
  name: "auth-page",
  data() {
    return {
      thisYear: new Date().getFullYear(),
      form: "auth-login", // 'auth-register'
    };
  },
  props: ["user"],
  components: {
    Login,
    Register,
  },
  methods: {
    changeForm(page) {
      this.form = page;
    },
    prosesLogin(payload) {
      this.$emit("prosesLogin", payload);
    },
    prosesRegister(payload) {
      this.$emit("prosesRegister", payload);
    },
    googleLogin(authCode) {
      this.$emit("googleLogin", authCode);
    },
  },
};
</script>

<style>
</style>