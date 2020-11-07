<template>
<div>
    <div class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-md-3 bg-white">
            <div class="row">
                <h5 class="col-sm bg-info text-center p-2"><a v-on:click.prevent="changePage('register-page')" class="text-decoration-none text-white" href="#">Register</a></h5>
                <h5 class="col-sm bg-secondary text-center p-2"><a v-on:click.prevent="changePage('login-page')" class="text-decoration-none text-white" href="#">Login</a></h5>
            </div>
            <form @submit.prevent="login" class="text-dark">
                <div class="form-group">
                    <label for="email">Email</label><br>
                    <input v-model="email" type="text" class="form-control form-control-sm w-100" id="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label><br>
                    <input v-model="password" type="password" class="form-control form-control-sm w-100" id="password">
                </div>
                <button type="submit" class="btn shadow-lg rounded btn-block btn-secondary mb-2">Login</button>
            </form>
            <div v-google-signin-button="clientId" class="g-signin2 mb-4" data-width="307" data-longtitle="true"></div>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    name: 'LoginPage',
    data(){
        return {
            email: '',
            password: '',
            clientId: '882276177256-qulq01c02qaf5qj8rvisank8r4akdnkt.apps.googleusercontent.com'
        }
    },
    methods:{
        login(){
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('login', payload)
            this.email = ''
            this.password = ''
        },
        OnGoogleAuthSuccess (idToken) {
            //console.log(idToken)
            this.$emit('onSignIn', idToken)
        },
        OnGoogleAuthFail (error) {
          console.log(error)
        },
        changePage(name){
            this.$emit('changePage', name)
        }
    }
}
</script>

<style>

</style>