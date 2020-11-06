<template>
    <section>
        <header class="header">
            <nav class="navbar navbar-expand-lg navbar-ligth py-3">
                <div class="container">
                    <h1 class="text-center">KANBAN APP</h1>
                </div>
        </header>
        <div class="container">
            <div class="row py-5 mt-4 align-items-center">
                <!-- For Demo Purpose -->
                <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
                    
                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" class="img-fluid mb-3 d-none d-md-block">
                    <h1>Create an Account</h1>
                    <p class="font-italic text-muted mb-0">Trello Clone by Anan</p>
                </div>

                <!-- Registeration Form -->
                <div class="col-md-7 col-lg-6 ml-auto">
                    <form @submit.prevent="register">
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
                                    <span class="font-weight-bold">Create your account</span>
                                </button>
                            </div>
                        </div>
                    </form>
                    <!-- Divider Text -->
                    <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                        <div class="border-bottom w-100 ml-5"></div>
                        <span class="px-2 small text-muted font-weight-bold text-muted">OR</span>
                        <div class="border-bottom w-100 mr-5"></div>
                    </div>

                    <!-- Social Login -->
                    <div class="row">
                        <div class="form-group col-lg-12 mx-auto">
                            <button v-google-signin-button="clientId" class="btn btn-danger btn-block py-2"> Continue with Google
                            </button>
                        </div>
                    </div>
                            <!-- Already Registered -->
                    <div class="text-center w-100">
                        <p class="text-muted font-weight-bold">Already Registered? <a href="#" class="text-primary ml-2" v-on:click="pindahKe('login-page')">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'RegisterPage',
    data(){
        return {
            email: '',
            password: '',
            clientId: "211581587680-amoikjusfctrvoadbqu05p4dp6ete404.apps.googleusercontent.com"
        }
    },
    methods: {
        pindahKe(page){
            this.$emit('changePage', page)
        },
        register(){
            let dataUser = {
                email: this.email,
                password: this.password
            }
            this.$emit('register', dataUser)
        },
        OnGoogleAuthSuccess (idToken) {
            this.$emit('googleLogin', idToken)
        },
        OnGoogleAuthFail (error) {
          console.log(error)
        },
    }
}
</script>

<style>

</style>