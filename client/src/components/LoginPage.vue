<template>
  <div class="container">
            <div class="row content">
                <div class="col-md-6 mb-3">
                    <img src="/img.svg" class="img-fluid" alt="image">
                </div>
                <div class="col-md-6 mb-3">
                    <h3 class="signin-text mb-3">Sign In</h3>
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model="email" type="email" name="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="password" type="password" name="password" class="form-control">
                        </div>
                        <button class="btn btn-primary">Sign In</button>
                        <p role="button">Don't have any account yet?</p>
                    </form>
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
    methods: {
        login() {
            let payload = {
                email: this.email,
                password: this.password
            }
            //console.log(payload)
            this.$emit('login', payload)
        }
    }
}
</script>

<style>

</style>