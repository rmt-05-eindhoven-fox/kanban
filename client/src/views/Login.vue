<template>

        <!-- Section Login -->
    <section class="Form my-4 mx-5" id="LoginPage">
        <div class="container">
            <div class="row no-gutters" >
                <div class="col-lg-5">
                    <img src="../../scrum_board.png" class="img-fluid" alt="">
                </div>
                <div class="col-lg-7 px-5 pt-5">
                    <h3>Login into your account</h3>
                    <form @submit.prevent="login">
                        <div class="form-row">
                            <div class="col-lg-7">
                                <input v-model="user.email" type="email" id="login-email" class="form-control my-3 p-4"
                                    placeholder="Email address" required="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-7">
                                <input v-model="user.password" type="password" id="login-password" class="form-control my-3 p-4"
                                    placeholder="password" required="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-7">
                                <button type="submit" class="btn btn-primary" mt-3 mb-5>Login</button>
                            </div>
                        </div>
                         <div class="form-row">
                    <p>Don't have an account? <a @click="changeRegister" href="#">Register here</a></p>
                </div>
                    </form>
                         <div class="form-row">
                            <div class="col-lg-7">
                                <div class="g-signin2" data-onsuccess="onSignIn"></div><br>
                            </div>
                        </div>
                </div>
                       

               
            </div>
        </div>


    </section>
       



</template>

<script>
import axios from "../config/axios"
export default {
    name : "LoginPage", 
    data() { 
        return { 
            user : { 
                email : "", 
                password : ""
            }
        }
    }, 
    methods : {

        changeName(name) { 
            this.pageName = name
        },

        login() { 
            let payload = this.user
            console.log(payload);   
            this.$emit('login', payload)
        
        }, 

        changeRegister(){ 
            this.$emit("changeRegister", "RegisterPage")
        }

    }
}
</script>

<style>

</style>