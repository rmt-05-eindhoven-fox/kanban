<template>
    <div>
        <!-- login page -->
        <LoginPage
            v-if="page === 'login'"
            @login = "login"
            @switchPage = "switchPage"
            >

        </LoginPage> 
        <!-- kanban page -->
        <HomePage 
            v-if="page === 'home'"
            :kanban= 'kanban'
            @signOut = "signOut">
        </HomePage>
        <!-- register page  -->
        <RegisterPage 
            v-if="page === 'register'"
            >
        </RegisterPage>

        <!-- Not found  -->
        <NotFound
            v-else
            >
        </NotFound>

    </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'


export default {
    name: "App",
    data(){
        return {
            msg: "weeb",
            kanban: []
        }
    },
    components: {
        HomePage,
        LoginPage,
        RegisterPage
    },
    methods: {
        switchPage(pageName){
            this.page = pageName
        },
        addKanban(){
            // let data = {
            //     title = this.title,
            //     progress = this.progress,
            //     description = this.description,

            // }
            // this.kanban.push(data)
            // this.title = ''
            // this.progress = ''
            // this.description = ''
        },
        login(data){ 
            let {email, password} = data
            console.log(email,password,"ini dari app.vue")
            axios({
                method: "POST",
                url: '/users/sign-in',
                data: {email, password}
            })
            .then(({data}) => {
                console.log(data, "MASUK BRO")
                localStorage.setItem('access_token', data.access_token)
                this.checkLogin()
    
            })
            .catch(err => {
                console.log(err,"masuk ke sini brooo ke erorr  ")
            })
            
            
        },
        fetchTask(){
            let url = "/tasks"
            axios({
                url: url,
                headers: {
                    access_token: localStorage.access_token
                },
                method: "GET"
            })
            .then(result => {
                // console.log(result.data)
                this.kanban = result.data
                console.log(this.kanban)
            })
            .catch(err => {
                console.log(err)
            })
        },

        checkLogin(){
            if(localStorage.access_token){
                this.switchPage("home")
                this.fetchTask()
            }
            else {
                this.switchPage("login")
            }
        },
        register() {
            let payload = this.userRegister
            
            axios({
                url: '/users/sign-up',
                data: payload,
                method: "POST"
            })
            .then(result => {
                this.switchPage("login")
                this.userRegister.email = ""
                this.userRegister.password = ""
            })
            .catch(err =>{
                console.log(err)
            })
        },
        signOut(){
            localStorage.removeItem('access_token')
            this.switchPage("login")
        }
    },
    created(){
        this.checkLogin()
    }
}
</script>

<style>

</style>