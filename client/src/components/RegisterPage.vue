<template>
<section id="registerbody">
 <div class="container">
  <div class="row">
   <div class="col-md-6">
    <div class="card">
     <form class="box rounded" @submit.prevent="register">
      <h1 style="font-family: Impact; letter-spacing: 7px">Register</h1>
      <p class="text-muted" style="font-family: monospace;">
       Lets place a spot for yourself in our app
      </p>
      <input v-model="email" type="text" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <p style="color: white; font-size: 1em; font-family: monospace">
       Already got an account? Let's
       <a @click="toLoginPage" class="to-login" href="#" style="font-family: monospace;"> login</a>
      </p>
      <input type="submit" class="register-ipt" value="Register" href="#" />
      <div class="col-md-12">
       <ul class="social-network social-circle">
        <li>
         <a href="#" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a>
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
 name: "RegisterPage",
 data() {
  return {
   email: "",
   password: ""
  }
 },
 methods: {
  toLoginPage() {
   this.$emit('toLoginPage', 'login-page')
  },
  register() {
   let payload = {
    email: this.email,
    password: this.password
   }
   this.$emit("register", payload);
  },
 },
}
</script>

<style>

</style>
