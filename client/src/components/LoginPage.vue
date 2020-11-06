<template>
<section id="loginbody">
 <div class="container">
  <div class="row">
   <div class="col-md-6">
    <div class="card">
     <form @submit.prevent="login" class="box rounded">
      <h1 style="font-family: Impact; letter-spacing: 7px">Login</h1>
      <p class="text-muted" style="font-family: monospace;">
       Please enter your email and password
      </p>
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <p style="color: white; font-size: 1em;font-family: monospace;">
       Don't have an account? Register
       <a class=" to-register" href="#" style="font-family: monospace;">
        here</a>
      </p>
      <input type="submit" name="" class="login-ipt" value="Login" href="" />
      <div class="col-md-12">
       <ul class="social-network social-circle">
        <li>
         <a href="" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a>
        </li>
       </ul>
      </div>
     </form>
    </div>
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
   email: '',
   password: ''
  }
 },
 methods: {
  login() {
   let payload = {
    email: this.email,
    password: this.password
   }
   this.$emit("login", payload);
  }
 }
}
</script>

<style>

</style>
