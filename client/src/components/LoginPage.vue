<template>
    <section >
        <form @submit.prevent="login">
            <div class="imgcontainer">
                <img src="../../assets/undraw_secure_login_pdn4.png" alt="Avatar" class="avatar">
            </div>
            
            <div class="container">
                <label for="uname"><b>Email</b></label>
                <input v-model="email" type="email" placeholder="Enter Email" name="uname" required id='email-login'>
            
                <label for="psw"><b>Password</b></label>
                <input v-model="password" type="password" placeholder="Enter Password" name="psw" required id="email-password">
                    
                <button type="submit" >Login</button> 
                <!-- harus di .prevent supaya tidak ke reload -->
                <button type="button" class="register" @click.prevent="switchPage">Register</button>
            </div>   
        </form>
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
        login(){
            console.log(this.email,this.password," ini dari LoginPage")
            this.$emit("login", {
                email: this.email,
                password: this.password
            })
        },
        switchPage(){
            this.$emit("switchPage", "register")
        }
        
    }
}
</script>

<style>

</style>