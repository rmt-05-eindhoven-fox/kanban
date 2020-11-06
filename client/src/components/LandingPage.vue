<template>
  <div class="containerLanding">
    <!-- Navbar -->
    <div class="d-flex justify-content-center navhome">
      <a class="navbar-brand" href="#" @click.prevent="">
        <img
          src="https://icons-for-free.com/iconfiles/png/512/cards+kanban+management+project+tasks+trello+icon-1320165725577116630.png"
          width="50" height="50" class="d-inline-block" alt="" loading="lazy">
        KANBAN
      </a>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="frame">
          <!-- Navigasi -->
          <div class="nav">
            <ul class="links">
              <li class="signin-active"><a @click="changeNav" class="btn">Sign in</a></li>
              <li class="signup-inactive"><a @click="changeNav" class="btn">Sign up </a></li>
            </ul>
          </div>
          <!-- Login -->
          <Login
            @requestLogin="postLogin"
            @googleLogin="googleLogin">
          </Login>
          <!-- Register -->
          <Register @requestRegister="postRegister"></Register>
        </div>
      </div>
      <div class="col-6">
        <img class="kanbanImg" src="https://i.imgur.com/XLRW8O9.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login"
import Register from "./Register"

export default {
  name: "LandingPage",
  components: {
    Login,
    Register
  },
  methods: {
    changeNav(){
      $(".form-signin").toggleClass("form-signin-left");
      $(".form-signup").toggleClass("form-signup-left");
      $(".signup-inactive").toggleClass("signup-active");
      $(".signin-active").toggleClass("signin-inactive");
      $(this).removeClass("idle").addClass("active");
    },
    postLogin(payload) {
      this.$emit("postLogin", payload)
    },
    postRegister(payload) {
      this.$emit("postRegister", payload)
    },
    googleLogin(payload){
      this.$emit("googleLogin", payload)
    }
  },
}
</script>

<style>
</style>