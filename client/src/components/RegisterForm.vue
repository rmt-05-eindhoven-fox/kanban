<template>
	<!-- Material form login -->
	<form>
		<p class="h4 text-center mb-4">Sign Up</p>
		<div class="grey-text">
			<mdb-input v-model="email" label="Your email"  type="email"/>
			<mdb-input v-model="password" label="Your password"  type="password"/>
		</div>
		<div class="text-center">
			<mdb-btn @click="registerProcess()">Register</mdb-btn>
		</div>
		<div class="form-group">Already have account ? please 
			<a href="#" class="" id="login" @click.prevent="$emit('screen', 'LoginForm')">Login</a>
		</div>
	</form>
	<!-- Material form login -->
</template>
<script>
  const baseUrl = "http://localhost:3000";

  import { mdbInput, mdbBtn } from 'mdbvue';
  import axios from "axios"
  import toastr from "vue-toastr"
  import Vue from "vue";

  Vue.use(toastr, {
  });

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
            if(Array.isArray(error.message)){
              this.$toastr.e("Error",
error.message.join()
              );
                //toastr.error();
            }else{
              this.$toastr.e("Error",error.message);
                //toastr.error(error.message);
            }
        },registerProcess(){
                console.log(this.email)
                console.log(this.password)
                axios
                .post(`${baseUrl}/users/register`,{
                    email:this.email,
                    password:this.password
                }).then(response => (
                    console.log(response.response)
                )).catch(err=>{
                    console.log(err.response.data)
                    this.showErrorMessage(err.response.data)
                    
                })

        }
    },
  }
</script>
