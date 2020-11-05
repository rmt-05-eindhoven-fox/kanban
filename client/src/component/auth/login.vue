<template>
  <div>
    <form @submit.prevent="prosesLogin()" class="card auth_form">
      <div class="header">
        <!-- <img class="logo" src="public/images/" alt=""> -->
        <h5>Log in</h5>
      </div>
      <div class="body">
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
            placeholder="Email"
            required
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-append">
            <span class="input-group-text"><i class="zmdi zmdi-lock"></i></span>
          </div>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="signin_with">
          <button type="submit" class="btn-lg btn-link" @click="formRegister">
            Register new membership?
          </button>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block waves-effect waves-light"
        >
          SIGN IN
        </button>
        <div class="signin_with mt-3">
          <p class="mb-0">or Sign Up using</p>
          <button
            class="btn btn-primary btn-icon btn-icon-mini btn-round facebook"
          >
            <i class="zmdi zmdi-google"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "auth-login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    this.clearForm();
  },
  methods: {
    formRegister() {
      this.$emit("changeForm", "auth-register");
    },

    prosesLogin() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.clearForm();
      this.$emit("prosesLogin", payload);
    },

    clearForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style>
</style>