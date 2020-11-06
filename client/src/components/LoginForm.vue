<template>
	<!-- Material form login -->
	<form>
		<p class="h4 text-center mb-4">Sign in</p>
		<div class="grey-text">
			<mdb-input v-model="email" label="Your email" id="login-email"  type="email"/>
			<mdb-input v-model="password" label="Your password" id="login-password"  type="password"/>
		</div>
		<div class="text-center">
			<mdb-btn @click="loginProcess()">Login</mdb-btn>
		</div>
		<div class="form-group">
        Don't have account ? please 
			<a href="#" class="" id="register" @click.prevent="$emit('screen', 'RegisterForm')">Register</a>
		</div>
	</form>
	<!-- Material form login -->
</template>
<script>
  const baseUrl = "http://localhost:3000";

  import { mdbInput, mdbBtn } from 'mdbvue';
  import axios from "axios"
  import toastr from "vue-toastr"
  export default {
    name: 'Basic',
    components: {
      mdbInput,
      mdbBtn
    },
    data(){
        return {
            email:"",
            password:""
        }
    },
    methods: {
        showErrorMessage(error) {
            if(Array.isArray(error.responseJSON.message)){
                toastr.error(error.responseJSON.message.join());
            }else{
                toastr.error(error.responseJSON.message);
            }
        },loginProcess(){
                console.log(this.email)
                console.log(this.password)
                axios
                .post(`${baseUrl}/users/login`,{
                    email:this.email,
                    password:this.password
                }).then(response => {
                  console.log(response)
                    localStorage.setItem("token", response.data.token)
                    if(localStorage.getItem("token")){
                        this.$emit('screen', 'ProjectForm')
                        this.$emit('setToken',response.data.token)
                    }
                }).catch(err=>{
                    this.showErrorMessage(err.response.data)
                    console.log(err.response.data)
                })

        }
    },
  }
  
</script>
