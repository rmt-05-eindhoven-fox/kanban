<template>
    <div class="allbox" style="text-align: center;">
        <form style="margin: auto;" v-on:submit.prevent="login">
            <h3 style="margin: 2% 50%;">LOGIN</h3>
            <div class="form-row align-items-center" style="margin: 3% 45%; width: 25%;">
                <div class="col-auto">
                    <input type="email" v-model="email" class="form-control mb-2" placeholder="Email">
                    <input type="password" v-model="password" class="form-control mb-2" placeholder="Password">
                    <button type="submit" class="btn btn-primary mb-2">Login</button>
                </div>
            </div>
        </form>
        <button v-google-signin-button="clientId" class="google-signin-button btn btn-primary">Login With <i class="fab fa-google"></i></button>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            clientId: '21714498265-evpushpdvbgdtp1nqfqs44d7tr8sh9rk.apps.googleusercontent.com'
        }
    },
    props: ['server'],
    methods:{
        login() {
            axios({
                method: 'POST',
                url: this.server + '/login',
                data:{
                    email: this.email,
                    password: this.password,
                }
            })
            .then(result => {
                swal.fire({
                    icon: 'success',
                    title: 'Login Success!',
                    text: 'Login Done!!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem('access_token', result.data.access_token)
                this.changePage('dashboard')
            })
            .catch(err => {
                swal.fire({
                    icon: 'error',
                    title: 'Opps...',
                    text: 'Wrong password or email',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(err.message)
            })
        },
        changePage(PageName) {
            this.$emit('changePage', PageName)
        },
        OnGoogleAuthSuccess (idToken) {
            axios({
                method: 'POST',
                url: this.server + '/loginGoogle',
                data:{
                    google_access_token: idToken
                }
            })
            .then(result => {
                this.changePage('dashboard')
                localStorage.setItem('access_token', result.data.access_token)
            })
            .catch(err => {
                console.log(err)
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style>
.google-signin-button {
    padding: 0%;
    height: 40px;
    font-size: 16px;
    border-radius: 5px;
    margin: 0% 46%; 
    width: 15%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>