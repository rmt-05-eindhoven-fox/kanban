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
              <button
                v-google-signin-button="clientId"
                class="google-signin-button"
              >
                Continue with Google
              </button>
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
      clientId:
        "871000054021-4p2lmcgbcr8a9dj7t1s8k413n93po7di.apps.googleusercontent.com",
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
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      const payload = {
        google_access_token: idToken,
      };
      this.$emit("googlelogin", payload);
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>