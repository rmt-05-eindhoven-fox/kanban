<template>
  <div class="container p-5">
        <div class="row">
            <div class="col-8">
                <img width="100%" src="../../working.png">
            </div>
            <div class="col-4 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column">
                    <div>
                        <h3>Sign in to access wonderful app!</h3>
                    </div>
                    <div>
                        <form @submit.prevent="signin">
                            <div class="form-group">
                                <label for="email">Email</label><br>
                                <input v-model="user.email" type="email" name="email" placeholder="example@gmail.com"><br>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label><br>
                                <input v-model="user.password" type="password" name="email" placeholder="password"><br>
                            </div>
                            <input type="submit" value="Sign in" class="btn btn-primary">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signin',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signin() {
            let data = this.user
            this.$emit('signin', data)
        }
    }
}
</script>

<style>

</style>