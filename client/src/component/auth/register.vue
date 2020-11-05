<template>
  <div>
    <form @submit.prevent="prosesRegister()" class="card auth_form">
      <div class="header">
        <h5>Register</h5>
        <span>Register a new membership</span>
      </div>
      <div class="body">
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text"
              ><i class="zmdi zmdi-account-box"></i
            ></span>
          </div>
          <input
            v-model="fullname"
            type="text"
            class="form-control"
            placeholder="Full Name"
            required
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text"
              ><i class="zmdi zmdi-email"></i
            ></span>
          </div>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter Email"
            required
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text"><i class="zmdi zmdi-lock"></i></span>
          </div>
          <input
            v-model="password"
            type="text"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="checkbox">
          <input id="remember_me" type="checkbox" />
          <label for="remember_me"
            >I read and agree to the
            <a href="javascript:void(0);">terms of usage</a></label
          >
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block waves-effect waves-light"
        >
          REGISTER
        </button>
        <div class="signin_with mt-3">
          <a class="link" href="#" @click="formLogin"
            >You already have a membership?</a
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "auth-register",
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
    };
  },
  created() {
    this.clearForm();
  },
  props: ["user"],
  methods: {
    prosesRegister() {
      const payload = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
      };
      this.$emit("prosesRegister", payload);
      if (this.user.status == 201) {
        this.clearForm();
        this.formLogin();
      }
    },

    clearForm() {
      this.fullname = "";
      this.email = "";
      this.password = "";
    },

    formLogin() {
      this.$emit("changeForm", "auth-login");
    },
  },
};
</script>

<style>
</style>