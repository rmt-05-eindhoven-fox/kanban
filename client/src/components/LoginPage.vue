<template>
  <div>
    <section id="login-page">
      <div class="container d-flex justify-content-center">
        <div class="row">
          <div class="col-12 logo-kanban">
            <img :src="logoPng" alt="" srcset="" />
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <h3 class="text-center">Login to your account</h3>
        <div class="row justify-content-center">
          <div class="col-12 col-lg-4">
            <form @submit.prevent="userLogin">
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="login-email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="login-password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            <div class="btn-section">
              <button type="submit" class="btn btn-login btn-block">Login</button><br />
            </div>
            </form>
            <button
                v-google-signin-button="clientId"
                class="google-signin-button btn btn-block"
              ><i class="fa fa-google mr-2"></i>
                Continue with Google
              </button>
              <button
                type="button"
                @click="toRegisterPage"
                class="btn btn-link"
              >
                Create your account
              </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  props: ["logoPng"],
  data() {
    return {
      email: "",
      password: "",
      clientId:
        "211381381074-kkjkvvfeprailfa7erhul80t26rdumvc.apps.googleusercontent.com",
    };
  },
  methods: {
    userLogin() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("userLogin", payload);
    },

    OnGoogleAuthSuccess(idToken) {
      this.$emit("googleLogin", idToken);
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },

    toRegisterPage() {
      let data = {
        pageName: "register",
      };
      this.$emit("toRegisterPage", data);
    },
  },
};
</script>

<style>
.google-signin-button {
    background-color: #00A8FF;
    color: #ffffff;
    margin-top: 15px;
  }
.google-signin-button:hover {
  background-color: #168eca;
  color: #ffffff;
  transition: 0.3s ease;
}
</style>
