<template>
  <section>
    <div class="row">
      <div class="col d-flex justify-content-center login-side">
        <div class="align-self-center">
          <div class="card login-card">
            <div class="card-body">
              <h1 class="text-center">Login</h1>
              <form @submit.prevent="login" class="login-form">
                <div class="form-group">
                  <label for="register-email">Email address</label>
                  <input v-model="email" type="email" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="register-password">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                  />
                </div>
                <button type="submit" class="btn login-btn">Login</button>
                <div class="form-group">
                  <small class="form-text text-muted text-center"
                    >Don't have an account yet?
                    <span @click.prevent="showRegister" class="to-login"
                      >Register</span
                    ></small
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center brand-side">
        <div class="align-self-center">
          <img
            src="../../img/login-kanban.png"
            alt=""
            class="kanban-illustration"
          />
          <h1 class="text-center brand-title">Kanban App</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    showRegister() {
      this.$emit("showRegister", "register-page");
    },
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("login", payload);
    },
  },
};
</script>

<style>
</style>