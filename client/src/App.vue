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
            @signOut = "signOut"
            @switchPage = 'switchPage'
            @destroy = 'destroy'
            @edit = 'edit'
            @goToEdit = 'goToEdit'
            >
        </HomePage>
        <!-- register page  -->
        <RegisterPage 
            v-if="page === 'register'"
            @switchPage = 'switchPage'
            @register = 'register'
            >
        </RegisterPage>
        <Add
          v-if="page === 'add'"
          @add = 'addTask'
          @switchPage = 'switchPage'
          >
        </Add>
        <Edit 
          v-if="page === 'edit'"
          :task='task'
          @edit= 'edit'
          @switchPage= 'switchPage'
          >
        </Edit>
    </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import Add from './components/Add'
import Edit from './components/Edit'

export default {
    name: "App",
    data(){
        return {
            page: 'login',
            kanban: [],
            task: {}
        }
    },
    // computed: {
    //     kanban () {
    //       return []
    //     }
    // },
    components: {
        HomePage,
        LoginPage,
        RegisterPage,
        Add,
        Edit
    },
    methods: {
        goToEdit(payload){
            this.page = payload.pageName
            this.task = payload
        },
        switchPage(pagename){
            this.page = pagename
        },
        addTask(payload){
            // let data = {
            //     title = this.title,
            //     progress = this.progress,
            //     description = this.description,
            // }
            // this.kanban.push(data)
            // this.title = ''
            // this.progress = ''
            // this.description = ''
            axios({
                method: "POST",
                url: '/tasks',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: payload
            })
            .then(({data}) => {
                this.switchPage('home')
            })
            .catch(err =>{
                console.log(err)
            })
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
                this.switchPage("home")
                console.log("ini masuk broo")
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
            if(localStorage.getItem('access_token')){
                this.switchPage("home")
                this.fetchTask()
            }
            else {
                this.switchPage("login")
            }
        },
        register(payload) {
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
        },
        destroy (id) {
            console.log(id, "masuk ke app.vue")
            axios({
              url: '/tasks/' + id,
              method: 'delete',
              headers: {
                    access_token: localStorage.access_token
              }
            })
            .then(() =>{
                this.switchPage('home')
                this.fetchTask()
            })
            .catch(err => {
                console.log(err)
            })
        },
        edit (payload) {
            axios({
              url: '/tasks/' + payload.id,
              method: 'put',
              headers: {
                access_token: localStorage.access_token
              },
              data: {
                title: payload.title,
                description: payload.description,
                progress: payload.progress
              }
            })
            .then(() =>{
                this.switchPage('home')
                this.fetchTask()
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.checkLogin()
    }
}
</script>

<style>

</style>