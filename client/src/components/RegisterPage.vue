<template>
    <section  id="register-page">
   <div>
    <div class="logo">
     <img src="../img/kanbattetransparent.png" alt="" width="500px" />
    </div>
    <h1>Register</h1>
    <form id="submit-login">
     <label>Email:</label>
     <input type="email" id="email-login" v-model="email" />
     <label>Password:</label>
     <input type="password" id="password-login" v-model="password" />
     <br />
     <button class="login-btn" type="submit">Register</button> <br />
    </form>
    <span>Already have an account?
     <a @click.prevent="changePage('login-page')" href="#" id="go-to-signin">Sign in</a></span>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>