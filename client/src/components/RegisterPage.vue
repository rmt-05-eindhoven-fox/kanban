<template>
<!-- <div> -->
    <div class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <div class="col-md-3 bg-light">
            <div class="row">
                <h5 class="col-sm bg-info text-center p-2"><a v-on:click.prevent="changePage('register-page')" class="text-decoration-none text-white" href="#">Register</a></h5>
                <h5 class="col-sm bg-secondary text-center p-2"><a v-on:click.prevent="changePage('login-page')" class="text-decoration-none text-white" href="#">Login</a></h5>
            </div>
            <form @submit.prevent="register" class="text-dark">
                <div class="form-group">
                    <label for="email">Email</label><br>
                    <input v-model="email" type="text" class="form-control form-control-sm w-100" id="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label><br>
                    <input v-model="password" type="password" class="form-control form-control-sm w-100" id="password">
                </div>
                <button type="submit" class="btn btn-block btn-info mb-4">Register</button>
            </form>
        </div>
    </div>
<!-- </div> -->
</template>

<script>
export default {
    name: 'RegisterPage',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        register(){
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('register', payload)
            this.email = ''
            this.password = ''
        },
        changePage(name){
            this.$emit('changePage', name)
        }
    }
}
</script>

<style>

</style>