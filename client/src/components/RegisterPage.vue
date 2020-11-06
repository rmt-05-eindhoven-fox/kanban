<template>
    <div class="row justify-content-center" style="margin-top: 20vh;">
        <div class="card shadow p-2 col-3 align-items-center">
            
            <div class="card-body">
                <h4 class="text-center text-purple">Register</h4>
                <form @submit.prevent="register">
                    <div class="form-group ">
                        <label >
                            Email
                        </label>
                        <input 
                            v-model="email"
                            class="form-control text-purple"
                            type="email"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label >
                            Password
                        </label>
                        <input 
                            v-model="password"
                            class="form-control text-purple"
                            type="password"
                        >
                    </div>
                
                    <button type="submit" class="btn btn-purple btn-block">Register</button>
                    <div class="text-center" style="font-size: 12px;">Already have an account? <a @click.prevent="changePage" class="btn-link" href="#" >Login</a></div>  
                    <div class="text-center" style="font-size: 12px;">or</div>

                </form>
                 <a v-google-signin-button="clientId" id="google-button" class="btn btn-block btn-social btn-google">
                    <i class="fa fa-google"></i> Sign in with Google
                </a>
            </div>
        </div>
        <img class="card shadow col-3 align-items-center" width="190px" src="https://image.freepik.com/free-vector/cute-purple-monster-face_1639-7293.jpg">   
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    props: ['clientId'],
    methods: {
        register() {
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('register', payload)
        },
        changePage() {
            let payload = {
                name: 'login'
            }
            this.$emit('changePage', payload)
        },
        OnGoogleAuthSuccess(idToken, googleUser) {
            this.$emit('OnGoogleAuthSuccess', idToken)
        },
        OnGoogleAuthFail(error) {
            this.$emit('OnGoogleAuthFail', error)
        }
    }
}
</script>

<style>

</style>