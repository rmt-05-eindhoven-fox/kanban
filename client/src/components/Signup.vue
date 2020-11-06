<template>
    <div class="container p-5">
        <div class="row">
            <div class="col-8">
                <img width="100%" src="../../working.png">
            </div>
            <div class="col-4 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column">
                    <div>
                        <h3>Sign up now for free!</h3>
                    </div>
                    <div>
                        <form @submit.prevent="signup">
                            <div class="form-group">
                                <label for="fullname">Full Name</label><br>
                                <input v-model="user.fullname" type="text" name="fullname" placeholder="Your name"><br>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label><br>
                                <input v-model="user.email" type="email" name="email" placeholder="example@gmail.com"><br>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label><br>
                                <input v-model="user.password" type="password" name="email" placeholder="password"><br>
                            </div>
                            <input type="submit" value="Sign up" class="btn btn-primary">
                        </form>
                    </div>
                    <div class="pt-2" style="color:gray">
                        <p>already have account?</p>
                    </div>
                    <div>
                        <a><button class="btn btn-primary">Sign in</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            user: {
                fullname: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signup() {
            let data = this.user
            this.$emit('signup', data)
        }
    }
}
</script>

<style>

</style>