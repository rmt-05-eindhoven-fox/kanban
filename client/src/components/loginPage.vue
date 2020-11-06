<template>
  
    <div id="login-page" class="global-container">
        <div class="card login-form">
        <div class="card-body">
            <h3 class="card-title text-center">Log in to Kanban</h3>
            <div class="card-text">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <a href="#" style="float:right;font-size:12px;">Forgot password?</a>
                        <input type="password" class="form-control form-control-sm" id="exampleInputPassword1">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign in</button>
                    
                    <div class="sign-up">
                        Don't have an account? <a href="#">Create One</a>
                    </div>
                </form>
                <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
export default {
    name: "LoginPage",
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
        changePage() {
            let payload = {
                pageName: 'home-page'
            }
            this.$emit('changePage', payload)
        },
        login(){
            let payload = {
                email: this.user.email,
                password: this.user.password
            }
            this.$emit('login', payload)
        },
        UserRegisterPage() {
            let payload = {
                pageName:'register-page'
            }
            this.$$emit('UserRegisterPage', payload)
        },
        OnGoogleAuthSuccess (idToken) {
           console.log(idToken)
        // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
        console.log(error)
        }
  }

}
</script>


<style>

</style>