<template>
    <section>
        <div class="container">
            <div class="row py-5 mt-4 align-items-center">
                <!-- For Demo Purpose -->
                <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
                    <img src="https://image.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg" alt="" class="img-fluid mb-3 d-none d-md-block">
                    <h1>Login into your account</h1>
                    <p class="font-italic text-muted mb-0">Trello Clone by Anan</p>
                </div>

                <div class="col-md-7 col-lg-6 ml-auto">
                    <form @submit.prevent="login">
                        <div class="row">
                            <!-- Email Address -->
                            <div class="input-group col-lg-12 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-envelope text-muted"></i>
                                    </span>
                                </div>
                                <input v-model="email" id="email" type="email" name="email" placeholder="Email Address" class="form-control bg-white border-left-0 border-md">
                            </div>

                            <!-- Password -->
                            <div class="input-group col-lg-12 mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                                        <i class="fa fa-lock text-muted"></i>
                                    </span>
                                </div>
                                <input v-model="password" id="password" type="password" name="password" placeholder="Password" class="form-control bg-white border-left-0 border-md">
                            </div>

                            <!-- Submit Button -->
                            <div class="form-group col-lg-12 mx-auto mb-0">
                                <button type="submit" class="btn btn-primary btn-block py-2">
                                    <span class="font-weight-bold">Login</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LoginPage',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login(){
            let dataLogin = {
                email: this.email,
                password: this.password
            }
            this.$emit('login', dataLogin)
        }
    }
}
</script>

<style>

</style>