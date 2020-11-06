<template>
  <section id="formLogin">
      <div class="containerFormLogin">
        <div class="contentFormLogin">
          <img src="https://rencanamu.id/assets/file_uploaded/blog/1507433805-file-dokum.jpg" alt=""
            style="position: absolute; border-radius: 10px;">
          <!-- CARD LOGIN -->
          <div class="cardLogin" v-if ="subPageName == 'cardLogin'"
            style="z-index: 2; background-color: yellow; border-radius: 10px;">
            <h4>Silahkan Login</h4>
            <form action="" @submit.prevent="login">
              <div class="form-group" style="display: flex; flex-direction: column;">
                <label for="">E-mail</label>
                <input v-model="userLogin.email" type="email" id="emailLogin" name="emailLogin">
              </div>
              <div class="form-group" style="display: flex; flex-direction: column;">
                <label for="">Password</label>
                <input v-model="userLogin.password" type="password" name="passwordLogin" id="passwordLogin">
              </div>
              <div style="display: flex; margin-top: 20px;">
                <button class="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
            <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
            <div style="margin:20px">
              <p style="margin:0px; padding:0px;">Belum punya akun ?</p>
              <a  style="margin:0px; padding:0px; text-decoration: none;"
                href="#" @click="subPageName = 'cardRegister'">Register
                Here..</a>
            </div>
          </div>
          <!-- CARD REGISTER -------------------------->
          <div class="cardRegister cardLogin" v-if ="subPageName == 'cardRegister'"
            style="z-index: 2; background-color: yellow; border-radius: 10px;">
            <h4>Register Dulu ya..</h4>
            <form action="" @submit.prevent='register'>
              <div class="form-group" style="display: flex; flex-direction: column;">
                <label for="">Name</label>
                <input v-model="newMember.name" type="text" id="nameRegister" name="nameRegister">
              </div>
              <div class="form-group" style="display: flex; flex-direction: column;">
                <label for="">E-mail</label>
                <input v-model="newMember.email" type="email" id="emailRegister" name="emailRegister">
              </div>
              <div class="form-group" style="display: flex; flex-direction: column;">
                <label for="">Password</label>
                <input v-model="newMember.password" type="password" name="passwordRegister" id="passwordRegister">
              </div>
              <div style="display: flex; margin-top: 20px;">
                <button class="btn btn-primary" type="submit">Register</button>
              </div>
            </form>
          </div>
    </section>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "gate",
  data() {
    return {
      subPageName: "cardLogin",
      clientId:
        "498807088801-tvti3e47rcbqf4kd3105jp6opiktcp19.apps.googleusercontent.com",
      newMember: {
        name: "",
        email: "",
        password: "",
      },
      userLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      this.$emit("register", this.newMember);
      this.subPageName = "cardLogin";
    },
    login() {
      this.$emit("login", this.userLogin);
    },
    OnGoogleAuthSuccess(idToken) {
      this.$emit("loginGoogle", idToken);

      // Receive the idToken and make your magic with the backend
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