<template>
    <div class="row justify-content-center" style="margin-top: 15vh;">
        <div class="card shadow p-2" style="width: 20vw;">
            
            <div class="card-body">
                <h4 class="text-center">Register</h4>
                <form @submit.prevent="register">
                    <div class="form-group ">
                        <label >
                            Email
                        </label>
                        <input 
                            v-model="email"
                            class="form-control text-success"
                            type="email"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label >
                            Password
                        </label>
                        <input 
                            v-model="password"
                            class="form-control text-success"
                            type="password"
                        >
                    </div>
                
                    <button type="submit" class="btn btn-success btn-block">Register</button>
                    <div class="text-center" style="font-size: 12px;">Already have an account? <a @click.prevent="changePage" class="btn-link" href="#" >Login</a></div>  
                    <div class="text-center" style="font-size: 12px;">or</div>
                    <div class="text-center" style="font-size: 12px;">Login with Google</div>

                    <!-- <div class="row justify-content-center">
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        
                    </div> -->
                 
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
                email: this.email,
                password: this.password
            }
            this.$emit('register', payload)
        },
        changePage() {
            let payload = {
                name: 'login'
            }
            this.$emit('changePage', payload)
        }
    }
}
</script>

<style>

</style>