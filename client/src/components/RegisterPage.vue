<template>
  <section id="register-page" class="container">
    <div class="row justify-content-center align-items-center">
      <!-- <div class="col-5 mr-5">
        <img class="main-img" src="assets/kanban-board.svg" width="450px" />
      </div> -->
      <div class="form-container col-4 shadow-lg p-4">
        <h2 class="text-center mb-4">Register User</h2>
        <form
        @submit.prevent="register">
          <!-- REGISTER - Name -->
          <div class="form-group">
            <label for="register-name">Name:</label>
            <input v-model="user.name" type="name" id="register-name" class="form-control" />
          </div>
          <!-- REGISTER - E-mail -->
          <div class="form-group">
            <label for="register-email">E-mail:</label>
            <input
            v-model="user.email"
              type="email"
              id="register-email"
              class="form-control"
              autocomplete="email"
            />
          </div>
          <!-- REGISTER - Password -->
          <div class="form-group">
            <label for="register-password">Password:</label>
            <input
            v-model="user.password"
              type="password"
              id="register-password"
              class="form-control"
              autocomplete="current-password"
            />
          </div>
          <div class="d-flex flex-column">
            <button type="submit" class="btn btn-dark">Register</button>
            <button @click="toLoginPage" class="btn btn-link mt-5">Already have an account?</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      pageName: ''
    };
  },
  methods: {
    register() {
      let payload = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      }
      this.$emit('register', payload)
    },
      toLoginPage() {
      let payload = {
        pageName: 'login-page'
      }
      this.$emit('toLoginPage', payload)
    }
  },
};
</script>

<style>
</style>