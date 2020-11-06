<template>
  <div>
    <section id="register-page">
      <div class="container d-flex justify-content-center">
        <div class="row">
          <div class="col-12 logo-kanban">
            <img :src="logoPng" alt="" srcset="" />
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <h3 class="text-center" id="register">Create your account</h3>
        <div class="row justify-content-center">
          <div class="col-12 col-lg-4">
            <form @submit.prevent="createAccount()">
              <div class="form-group">
                <input
                  v-model="full_name"
                  type="text"
                  class="form-control"
                  id="register-full-name"
                  name="full-name"
                  placeholder="Full Name"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="register-email"
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
                  id="register-password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div class="btn-section">
                <button type="submit" class="btn btn-register">Register</button
                ><br />
                <button type="button" @click="toLoginPage" class="btn btn-link">Login to your accout</button>
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
  name: "RegisterPage",
  props: ["logoPng"],
  data() {
    return {
      full_name: '',
      email: '',
      password:'',
    };
  },
  methods: {
    createAccount(){
      let payload = {
        full_name: this.full_name,
        email: this.email,
        password: this.password
      }
      this.$emit('createAccount', payload)
    },
    toLoginPage(){
      let data = {
        pageName: 'login'
      }
      this.$emit('toLoginPage', data)
    }
  }
};
</script>

<style>
</style>