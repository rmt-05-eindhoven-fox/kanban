<template>
  <section class="container-fluid" id="register">
    <div class="container">
      <div class="row align-items-center" style="height: 100vh">
        <div class="col-7">
          <img class="w-100" src="../assets/image.svg" />
          <h1>Start manage your work using Kanban</h1>
        </div>
        <div class="col-5 p-5 shadow rounded">
          <h1>Register User</h1>
          <hr />
          <br />
          <div class="error-message"></div>
          <form @submit.prevent="register()" id="register">
            <div class="form-group">
              <label for="first_name">First Name</label>
              <input v-model="first_name" type="text" id="first_name" class="form-control" />
            </div>
            <div class="form-group">
              <label for="last_name">Last Name</label>
              <input v-model="last_name" type="text" id="last_name" class="form-control" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                class="form-control"
                autocomplete="email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="form-control"
                autocomplete="current-password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Register</button
            ><br /><br />
            <span class="btn btn-link" @click="toLogin">Already have an account? Login now!</span>
            <br /><br />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterPage",
  data(){
    return{
      first_name:"",
      last_name:"",
      email:"",
      password:""
    }
  },
  methods:{
    toLogin(){
      let payload = {
        pageName:"login-page"
      }
      this.$emit("changePage",payload.pageName)
    },
    register(){
      const payload ={
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }
      console.log(payload)
      this.$emit("register", payload)
      this.clearForm()
    },
    clearForm(){
      this.first_name=""
      this.last_name=""
      this.email=""
      this.password=""
    }
  }
};
</script>

<style>
</style>