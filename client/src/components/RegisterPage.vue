<template>
    <section >
        <form action="" method="post">
            <div class="imgcontainer">
              <img src="../assets/undraw_mobile_login_ikmv.png" alt="Avatar" class="avatar">
            </div>
              
            <div class="container">
              <label for="uname"><b>Email</b></label>
              <input v-model="emailRegister" type="email" placeholder="Enter Email" name="uname" required>
              
              <label for="psw"><b>Password</b></label>
              <input v-model="passwordRegister" type="password" placeholder="Enter Password" name="psw" required>
                      
              <button type="submit" @click.prevent="switchPage('login')">Register</button> 
                  <!-- harus di .prevent supaya tidak ke reload -->
            </div>
            
            <div class="container" style="background-color:#f1f1f1">
                <button @click.prevent="switchPage('login')" type="button" class="cancelbtn">Cancel</button>
            </div>
            </form>
    </section>
</template>

<script>
export default {
    name: "Registerpage",
    data () {
      return {
        emailRegister: '',
        passwordRegister: ''
      }
    },
    methods: {
      switchPage(pagename) {
        this.$emit('switchPage', pagename)
      },
      register () {
        const payload = {
          email: this.emailRegister,
          password: this.passwordRegister
        }
        this.$emit('register', payload)
      }
    }
}
</script>

<style>

</style>