<template>
  <!-- REGISTER PAGE -->
  <section id="register-page" class="container mt-5 pt-5">
    <div class="row mt-5 pt-5">
      <div class="col-sm-9 col-md-7 col-lg-5 m-auto">
        <div class="card card-login">
          <div class="card-body text-light">
            <h5 class="card-title text-center">REGISTER</h5>
            <form @submit.prevent="register()" class="form-login">
              <div class="form-group">
                <label for="email-register">Email Address</label>
                <input v-model="email_register" type="email" id="email-register" class="form-control rounded-pill p-4" placeholder="Email address" required autofocus>
              </div>
              <div class="form-group">
                <label for="password-register">Password</label>
                <input v-model="password_register" type="password" id="password-register" class="form-control rounded-pill p-4" placeholder="Password" required autofocus>
              </div>
              <hr class="bg-light my-4">
              <button class="btn btn-lg btn-primary btn-block mt-4 p-2 rounded-pill" type="submit">REGISTER</button>
              <hr class="bg-light my-4">
            </form>
            <small class="form-text text-center">Back to<a href="#" @click.prevent="changePage()" class="text-warning"> Login!</a></small>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="footer container text-center text-light">
        © 2020 KhanBhanBhoard by Bobby Septianto
      </div>
    </div>
  </section>
  <!-- REGISTER PAGE -->
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email_register: '',
      password_register: ''
    }
  },
  methods: {
    register() {
      let payload = {
        email_register: this.email_register,
        password_register: this.password_register
      };
      this.$emit('register', payload);
    },
    changePage() {
      this.$emit('changePage', 'login-page');
    }
  }
}
</script>

<style>

</style>