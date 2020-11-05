<template>
  <section>
    <div class="row">
      <div class="col d-flex justify-content-center login-side">
        <div class="align-self-center">
          <div class="card login-card">
            <div class="card-body">
              <h1 class="text-center">Register</h1>
              <form @submit.prevent="register" class="login-form">
                <div class="form-group">
                  <label for="register-email">First Name</label>
                  <input
                    v-model="first_name"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="register-email">Last Name</label>
                  <input v-model="last_name" type="text" class="form-control" />
                </div>
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
                <button type="submit" class="btn login-btn">Register</button>
                <div class="form-group">
                  <small class="form-text text-muted text-center"
                    >Already have an account?
                    <span @click.prevent="showLogin" class="to-login"
                      >Login</span
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
  name: "RegisterPage",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    showLogin() {
      this.$emit("showLogin", "login-page");
    },
    register() {
      const payload = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      };
      this.$emit("register", payload);
    },
  },
};
</script>

<style>
</style>