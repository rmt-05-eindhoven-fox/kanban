<template>
    <section >
        <form @submit.prevent="login">
            <div class="imgcontainer">
                <img src="../assets/undraw_secure_login_pdn4.png" alt="Avatar" class="avatar">
            </div>
            
            <div class="container">
                <label for="uname"><b>Email</b></label>
                <input v-model="email" type="email" placeholder="Enter Email" name="uname" required id='email-login'>
            
                <label for="psw"><b>Password</b></label>
                <input v-model="password" type="password" placeholder="Enter Password" name="psw" required id="email-password">
                    
                <button type="submit" class="login">Login</button> 
                <!-- harus di .prevent supaya tidak ke reload -->
                <button type="button" class="register" @click.prevent="switchPage">Register</button>
            </div>   
        </form>
        <div style="text-align: center;"><button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button></div>
    </section>
</template>

<script>
export default {
    name: "LoginPage",
    data() {
        return {
            email: '',
            password: '',
            clientId: '1095760211786-ajpnjuopeb62bsdiup8h8hnhfotjrntb.apps.googleusercontent.com'
        }
    },
    methods: {
        login(){
            console.log(this.email,this.password," ini dari LoginPage")
            this.$emit("login", {
                email: this.email,
                password: this.password
            })
        },
        switchPage(){
            this.$emit("switchPage", "register")
        },
        OnGoogleAuthSuccess (idToken) {
            // console.log(idToken)
            this.$emit('googleLogIn', idToken)
            // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>

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