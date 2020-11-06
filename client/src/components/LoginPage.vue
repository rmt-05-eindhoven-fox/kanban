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
                <button type="submit" class="btn btn-login">Login</button><br />
                <button type="button" @click="toRegisterPage" class="btn btn-link">Create your account</button>
              </div>
            </form>
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
      email: '',
      password: '',
    };
  },
  methods: {
    userLogin(){
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$emit('userLogin', payload)
    },

    toRegisterPage(){
      let data = {
        pageName: 'register'
      }
      this.$emit('toRegisterPage', data)
    }
  }
};
</script>

<style></style>
