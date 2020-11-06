<template>
    <div>
        <LoginPage 
        v-if="pageName == 'login-page'"
        @login="login"
        @changePage="changePage"
        @UserRegisterPage="UserRegisterPage"
        ></LoginPage>

        <RegisterPage 
        v-else-if="pageName == 'register-page'"
        @register="register"
        @UserLoginPage="UserLoginPage"
        ></RegisterPage>

        <AddPage v-else-if="pageName == 'add-page'"
        
        ></AddPage>
        
        <HomePage v-else-if="pageName == 'home-page'"
        ></HomePage>
       
    </div>
  
  
</template>

<script>
import RegisterPage from './components/registerPage'
import LoginPage from './components/loginPage'
import HomePage from './components/Homepage'
import AddPage from './components/addPage'
import axios from './config/axios'
export default {
        name: 'App',
        data() {
            return {
                pageName: 'home-page'
            }
        },
        components: {
            LoginPage, 
            RegisterPage, 
            HomePage, 
            AddPage,
        },

        methods: {
            changePage(name) {
                this.pageName = name
            }
        },

        UserLoginPage(payload) {
            axio({
                url: "/login",
                method: "POST",
                data: {
                    email:payload.email,
                    password:payload.password
                },
            })
            .then(({data}) => {
                const token = data.acces_token
                localStorage.setItem("access_token", token)
            })
        }
    
}
</script>

<style>

</style>