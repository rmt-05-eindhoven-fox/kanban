<template>
    <div class="allbox" style="text-align: center;">
        <form style="margin: auto;" v-on:submit.prevent="register">
            <h3 style="margin: 2% 48%;">REGISTER</h3>
            <div class="form-row align-items-center" style="margin: 3% 45%; width: 25%;">
                <div class="col-auto">
                    <input type="text" v-model="email" class="form-control mb-2" placeholder="Email">
                    <input type="password" v-model="password" class="form-control mb-2" placeholder="Password">
                    <button type="submit" class="btn btn-info mb-2">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name:'Register',
    data() {
        return {
            email: '',
            password: '',
            msg: ''
        }
    },
    props: ['server'],
    methods:{
        register() {
            axios({
                method: 'POST',
                url: this.server + '/register',
                data: {
                    email: this.email,
                    password: this.password,
                }
            })
            .then(result => {
                swal.fire({
                    icon: 'success',
                    title: 'Register Success!',
                    text: 'Please Login !!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.changePage('login')
                // console.log(result)
            })
            .catch(err => {
                console.log(err.respone.data)
            })
        },
        changePage(PageName) {
            this.$emit('changePage', PageName)
        }
    }
}
</script>

<style>

</style>