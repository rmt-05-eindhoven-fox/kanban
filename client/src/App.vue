<template>
<div class="container-fluid">
    <!-- REGISTER PAGE -->
    <RegisterPage 
        v-if="pageName == 'register-page'" 
        @register="register"
        @changePage="changePage">
    </RegisterPage>

    <!-- LOGIN PAGE -->
    <LoginPage 
        v-else-if="pageName == 'login-page'"
        @login="login"
        @changePage="changePage"
        @onSignIn="onSignIn">
    </LoginPage>

    <!-- HOMEPAGE -->
    <HomePage 
        v-else-if="pageName == 'homepage'"
        @changePage="changePage"
        @logout="logout">
    </HomePage>

    <!-- CREATE NEW TASK -->
    <AddTask 
        v-else-if="pageName == 'new-task'"
        @newTask="newTask"
        @changePage="changePage">
    </AddTask>
    <!-- DETAIL BACKLOG -->
    <DetailBacklog v-else-if="pageName == 'detail-backlog'"></DetailBacklog>
    <!-- DETAIL TODO -->
    <!-- <div v-else-if="pageName == 'detail-todo'" class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <form>
            <div class="col bg-light text-dark rounded shadow" style="width: 50vw;">
                <div class="row card-header text-center font-weight-bold justify-content-center mb-4">Detail Task : Coba</div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Title :</h6>
                    <p style="font-size: small">Coba</p>
                </div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Status :</h6>
                    <p style="font-size: small">To-Do</p>
                </div>
                <div class="d-flex mt-5 justify-content-between">
                    <div class="mb-4">
                        <button type="button" class="btn btn-secondary">Back-Log</button>
                    </div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-info text-white">Doing</button>
                    </div>
                </div>
            </div>
        </form>
    </div> -->
    <!-- DETAIL DOING -->
    <!-- <div v-else-if="pageName == 'detail-doing'" class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <form>
            <div class="col bg-light text-dark rounded shadow" style="width: 50vw;">
                <div class="row card-header text-center font-weight-bold justify-content-center mb-4">Detail Task : Coba</div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Title :</h6>
                    <p style="font-size: small">Coba</p>
                </div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Status :</h6>
                    <p style="font-size: small">To-Do</p>
                </div>
                <div class="d-flex mt-5 justify-content-between">
                    <div class="mb-4">
                        <button type="button" class="btn btn-warning text-white">To-Do</button>
                    </div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-success">Done</button>
                    </div>
                </div>
            </div>
        </form>
    </div> -->
    <!-- DETAIL DONE -->
    <!-- <div v-else-if="pageName == 'detail-done'" class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <form>
            <div class="col bg-light text-dark rounded shadow" style="width: 50vw;">
                <div class="row card-header text-center font-weight-bold justify-content-center mb-4">Detail Task : Coba</div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Title :</h6>
                    <p style="font-size: small">Coba</p>
                </div>
                <div class="mb-2">
                    <h6 style="font-weight: bold;">Status :</h6>
                    <p style="font-size: small">Done</p>
                </div>
                <div class="d-flex mt-5 justify-content-between">
                    <div class="mb-4">
                        <button type="button" class="btn btn-info text-white">Doing</button>
                    </div>
                    <div class="mb-4">
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                    <div class="mb-4">
                    </div>
                </div>
            </div>
        </form>
    </div> -->
</div> 
</template>

<script>
import axios from './config/axios'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import AddTask from './components/AddTask'
import DetailBacklog from './components/DetailBacklog'
export default {
    name: 'App',
    components:{
        HomePage, LoginPage, RegisterPage, AddTask, DetailBacklog
    },
    data() {
        return {
            pageName: 'register-page',
        };
    },
    methods:{
        changePage(name){
            this.pageName = name 
        },
        register (payload) {
            axios({
                method: 'POST',
                url: '/register',
                data:{
                    email: payload.email,
                    password: payload.password
                }
            })
                .then(result=>{
                    console.log(result)
                    swal("Account Created!", result.data.data, "success");
                    this.changePage('login-page')
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        onSignIn(idToken) {
            const id_token = idToken 
            axios({
                method: 'POST',
                url: '/googleLogin',
                data:{
                    id_token
                }
            })
                .then(result=>{
                    console.log(result)
                    swal("Login Success!", "You has signed in", "success");
                    localStorage.setItem('token', result.data.access_token)
                    this.changePage('homepage')
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        login (payload) {
            axios({
                method: 'POST',
                url: '/login',
                data:{
                    email: payload.email,
                    password: payload.password
                }
            })
                .then(result=>{
                    swal("Login Success!", "You has signed in", "success");
                    localStorage.setItem('token', result.data.access_token)
                    this.changePage('homepage')
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        logout () {
            localStorage.clear()
            this.changePage('login-page')
        },
        newTask (payload) {
            const token = localStorage.getItem('token')
            axios({
                method: 'POST',
                url: '/tasks',
                data:{
                    title: payload.title,
                    category: payload.category,
                },
                headers:{
                    token
                }
            })
                .then(result=>{
                    swal("Task Created!", result.data.data, "success");
                    this.changePage('homepage')
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        getAllTask(){
            const token = localStorage.getItem('token')
            axios({
                method: 'GET',
                url: '/tasks',
                headers:{
                    token
                }
            })
                .then(result=>{
                    console.log(result)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        checkLogin () {
            if(localStorage.token){
                this.pageName = 'homepage'
                this.getAllTask()
            }else{
                this.pageName = 'login-page'
            }
        }
    },
    created () {
        this.checkLogin()
    }
}
</script>

<style>

</style>