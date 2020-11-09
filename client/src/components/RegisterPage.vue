<template>
   <div class="container" id="register">
        <div class="row content" >
            <div class="col-md-6 mb-3">
                <img src="/data.svg" class="img-fluid" alt="image">
            </div>
            <div class="col-md-6 mb-3">
                <h3 class="signin-text mb-3"></h3>
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" name="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="password" type="password" name="password" class="form-control">
                    </div>
                    <button class="btn btn-primary">Sign Up</button>
                    <p role="button"
                    @click.prevent="$emit('changePage', 'login-page')"
                    >Have an account?</p>
                </form>
            </div>
        </div>
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
    methods: {
        register() {
            let payload = {
                email:this.email,
                password: this.password
            }
            //console.log(payload, 'masuk dong')
            this.$emit('register', payload)
        }
    }
}
</script>

<style>

</style>