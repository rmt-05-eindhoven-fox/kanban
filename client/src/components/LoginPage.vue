<template>
        <div class="row justify-content-center" style="margin-top: 15vh;">
            <div class="card shadow p-2" style="width: 20vw;">
                <div class="card-body">
                    <h4 class="text-center">Login</h4>
                    <form @submit.prevent="login">
                        <div class="form-group ">
                            <label >
                                Email
                            </label>
                            <input 
                                v-model="email"
                                class="form-control text-success"
                                type="email"
                            >
                        </div>
                        
                        <div class="form-group">
                            <label >
                                Password
                            </label>
                            <input 
                                v-model="password"
                                class="form-control text-success"
                                type="password"
                            >
                        </div>
                        
                        <button type="submit" class="btn btn-success btn-block">Login</button>
                        <div class="text-center" style="font-size: 12px;">Don't have an account? <a @click.prevent="changePage" class="btn-link" href="#" >Register</a></div>  
                        <div class="text-center" style="font-size: 12px;">or</div>
                        <div class="text-center" style="font-size: 12px;">Login with Google</div>

                       
                        
                    </form>
                    <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    props: ['clientId'],
    methods: {
        login() {
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('login', payload)
        },
        changePage() {
            let payload = {
                name: 'register'
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