<template>

    <div class="global-container">
        <div class="card login-form">
        <div class="card-body">
            <h3 class="card-title text-center">Register Account</h3>
            <div class="card-text">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="register-email">Email address</label>
                        <input 
                        v-model="user.email"
                        type="email" 
                        class="form-control form-control-sm" 
                        id="register-email"
                        >
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <a href="#" style="float:right;font-size:12px;">Forgot password?</a>
                        <input
                        v-model="user.password" 
                        type="password" 
                        class="form-control form-control-sm" 
                        id="register-password">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Create</button>
                    
                    <div @click="UserLogin" class="sign-up">
                        Already have account <a href="#">Create One</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
export default {
    name: "RegisterPage",
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            pageName: ''
        }
    }, 
    methods: {
        register() {
            let payload = {
                email: this.user.email,
                password: this.user.password
            }
            this.$emit('register', payload)
        },
        UserLoginPage() {
            let payload = {
                pageName:'loginPage'
            }
            this.$$emit('UserLoginPage', payload)
        }
    }

}
</script>

<style>

</style>