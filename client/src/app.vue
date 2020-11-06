<template>
    <div>
        <loginPage 
        v-if="pageName == 'login-page'"
        @login="login"
        @changePage="changePage"
        @UserRegisterPage="UserRegisterPage"
        ></loginPage>

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
import loginPage from './components/loginPage'
import HomePage from './components/Homepage'
import AddPage from './components/addPage'
export default {
        name: 'App',
        data() {
            return {
                pageName: 'home-page'
            }
        },
        components: {
            loginPage, 
            registerPage, 
            HomePage, 
            AddPage,
        }
    
}
</script>

<style>

</style>