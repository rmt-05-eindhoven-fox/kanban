<template>
        <div class="login-page">
            <div class="container-login" id="container"> 
                <div class="form-container sign-up-container">
                    <form @submit.prevent="register">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input v-model="newUser.email" type="email" placeholder="Email" />
                        <input v-model="newUser.password" type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form @submit.prevent="login">
                        <h1>Sign in</h1>
                        <div class="social-container">
                            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input v-model="user.email" type="email" placeholder="Email" />
                        <input v-model="user.password" type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button @click="loginSwitch" class="ghost" id="signIn">Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button @click="registerSwitch" class="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: "landingpage",
    data() {
        return {
        };
    },
};
</script>

<style scoped>
</style>