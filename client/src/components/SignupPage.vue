<template>
    <section id="register" class="kanban-login">
      <div class="overlay">
        <div class="wrapper">
          <div class="form-section">
            <div class="logo">
              <div class="brand-logo" href="">Kanban App</div>
            </div>
            <br>
            <h3>Sign Up</h3>
            <br>
            <form @submit.prevent="signUp" class="signin-form">
              <div class="form-input">
                <input v-model="first_name" type="text" name="first_name" placeholder="First Name" required="" autofocus>
              </div>
              <div class="form-input">
                <input v-model="last_name" type="text" name="last_name" placeholder="Last Name" required="" autofocus>
              </div>
              <div class="form-input">
                <input v-model="email" type="text" name="email" placeholder="Email" required="" autofocus>
              </div>
              <div class="form-input">
                <input v-model="password" type="password" name="password" placeholder="Password" required="">
              </div>
              <button type="submit" class="btn btn-primary theme-button mt-4">Sign Up</button>
            </form>
            <p class="login">Already have an account? <a href="" @click.prevent="toLogin" class="signuplink">Log In</a></p>
          </div>
        </div>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
<!-- >>>>>>>>> FOOTER <<<<<<<<<< -->
      <div class="copy-right">
        <p>&copy; 2020 Kanban - By Diva</p>
      </div>

    </section>
</template>

<script>
export default {
    name: "SignupPage",
    data(){
      return {
        first_name: '',
        last_name: '',
        email: '',
        password:''
      }
    },
    methods: {
      toLogin(){
        this.$emit("toLogin")
      },
      signUp() {
        let newUser = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password:this.password
        }
        this.$emit('signUp', newUser)
      }
    }
}
</script>

<style>

</style>