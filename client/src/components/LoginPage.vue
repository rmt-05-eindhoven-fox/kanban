<template>
  <section id="login-page" class="container">
    <div class="row justify-content-center align-items-center">
      <!-- <div class="col-5 mr-5"> -->
      <!-- <img class="main-img" src="assets/kanban-board.svg" width="450px" /> -->
      <!-- </div> -->
      <div class="form-container col-4 shadow-lg p-4">
        <h2 class="text-center mb-4">Kanban App</h2>
        <form @submit.prevent="login" id="form-login">
          <!-- LOGIN - E-mail -->
          <div class="form-group">
            <label for="login-email">E-mail:</label>
            <input
              v-model="user.email"
              type="email"
              id="login-email"
              class="form-control"
              autocomplete="email"
              required
            />
          </div>
          <!-- LOGIN - Password -->
          <div class="form-group">
            <label for="login-password">Password:</label>
            <input
              v-model="user.password"
              type="password"
              id="login-password"
              class="form-control"
              required
            />
          </div>
          <div class="d-flex flex-column">
            <button type="submit" class="shadow btn btn-dark">Login</button>
          </div>
        </form>
        <button @click="toRegisterPage" class="btn btn-link mt-3">Not a user yet? Register here</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      pageName: ''
    };
  },
  methods: {
    changePage() {
      let payload = {
        pageName: 'home-page'
      }
      this.$emit("changePage", payload.pageName);
    },
    login() {
      let payload = {
        email: this.user.email,
        password: this.user.password,
      };
      this.$emit("login", payload);
    },
    toRegisterPage() {
      let payload = {
        pageName: 'register-page'
      }
      this.$emit('toRegisterPage', payload)
    }
  },
};
</script>

<style>
</style>