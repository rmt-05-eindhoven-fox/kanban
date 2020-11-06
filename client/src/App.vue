<template>
  <div>
        <HomePage 
            v-if="pageName == 'home-page'"
            :categories="categories"
            :tasks="tasks"
            @changePage="changePage"
            @changeToEditPage="changeToEditPage"
            @deleteTask="deleteTask"
            @logout="logout"
            @moveCategory="moveCategory"
        ></HomePage>
        <CreateTaskPage v-else-if="pageName == 'createTask-page'"
            :createName="createName"
            @addTask="addTask"
            @backHome="backHome"
            @changePage="changePage"
        ></CreateTaskPage>
        <EditPage v-else-if="pageName == 'edit-page'"
            :editTask="editTask"
            @editTaskData="editTaskData"
            @changePage="changePage">
        </EditPage>
        <RegisterPage v-else-if="pageName == 'register-page'"
         @register="register"
         @changePage="changePage"
        ></RegisterPage>
        <LoginPage v-else-if="pageName == 'login-page'"
            @login="login"
            @googleLogin="googleLogin"
            @changePage="changePage"
        ></LoginPage>
        <ErrorPage v-else></ErrorPage>
  </div>
</template>

<script>
import HomePage from './components/HomePage'
import CreateTaskPage from './components/CreateTaskPage';
import EditPage from './components/EditPage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage'

import axios from './config/axios';
import Swal from 'sweetalert2'

export default {
    name: 'App',

    data() {
        return {
            pageName: 'login-page',
            categories: [
                {
                    name: 'Backlog',
                    class: 'bg-danger',
                    progress: 'width:25%'
                },
                {
                    name: 'Todo',
                    class: 'bg-warning',
                    progress: 'width:50%'
                },
                {
                    name: 'Doing',
                    class: 'bg-info',
                    progress: 'width:75%'
                },
                {
                    name: 'Done',
                    class: 'bg-success',
                    progress: 'width:100%'
                },
            ],
            tasks: [],
            createName: '',
            editTask: {} 
        }
    },
    components: {
        HomePage,
        CreateTaskPage,
        EditPage,
        RegisterPage,
        LoginPage,
        ErrorPage
    },
    methods: {
        backHome() {
            console.log('di app');
            this.pageName = 'home-page'
        },

        moveCategory(payload) {
            let access_token = localStorage.getItem('access_token')
            let category = payload.name

            axios({
                url: `tasks/${payload.id}`,
                method: 'PATCH',
                data: {category},
                headers: {access_token}
            }).then(res => {
                this.fetchAllTasks()
            }).catch(err => {
               Swal.fire('Oops...', `You're not allowed to edit other users task.`, 'error')
               //  console.log({err});
            })
        },

        login(payload) {
            axios({
                url: `users/login`,
                method: 'POST',
                data: payload
            }).then(res => {
                localStorage.setItem('access_token', res.data.access_token)
                this.fetchAllTasks()
                this.pageName = 'home-page'
            }).catch(err => {
               Swal.fire('Oops...', `${err.response.data}`, 'error')
                // console.log({err}); 
            })
        },

        googleLogin(idToken) {
             axios({
                url: `users/google-login`,
                method: 'POST',
                data: {idToken}
            }).then(res => {
                // console.log(res);
                localStorage.setItem('access_token', res.data.access_token)
                this.fetchAllTasks()
                this.pageName = 'home-page'
            }).catch(err => {
                console.log(err);
            })
        },

        register(payload) {
             axios({
                url: `users/register`,
                method: 'POST',
                data: payload
            }).then(res => {
                this.pageName = 'login-page'
            }).catch(err => {
                console.log(err);
            })
        },

        changePage(payload) {
            this.pageName = payload.page
            this.createName = payload.name
        },

        changeToEditPage(payload){
            console.log(payload);
            this.pageName = payload.pageName
            this.editTask = payload.task
        },

        fetchAllTasks() {
            let access_token = localStorage.getItem('access_token')
            // let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnYWJyaWVsQGdtYWlsLmNvbSIsImlhdCI6MTYwNDYwMDg4N30.DX73i64lZd0SmdxlWHHpZlAIzCnxeFEyWySobvg1Pdw'
            axios({
                url: `tasks`,
                method: 'GET',
                headers: {access_token}
            }).then(({data}) => {
                this.tasks = data
            }).catch(err => {
                console.log(err);
            })
        },

        editTaskData(payload){
            let access_token = localStorage.getItem('access_token')
            axios({
                url: `tasks/${payload.id}`,
                method: 'PUT',
                headers: {access_token},
                data: {
                    title: payload.title,
                    description: payload.description,
                }
            }).then(data => {
                this.fetchAllTasks()
                this.pageName = 'home-page'
            }).catch(err => {
                Swal.fire(`Error ${err.response.status} ${err.response.data.error}`, `You're not allowed to edit other users tasks.`, 'error')
                // console.log(err);
            })
        },

        deleteTask(id) {
            let access_token = localStorage.getItem('access_token')
            axios({
                url: `tasks/${id}`,
                method: 'DELETE',
                headers: {access_token},
            }).then(data => {
                this.fetchAllTasks()
                // this.pageName = 'home-page'
            }).catch((err) => {
                Swal.fire(`Error ${err.response.status} ${err.response.data.error}`, `You're not allowed to delete other users tasks.`, 'error')
                console.log(err.response);
            })
        },

        checkLogin(){
            if(localStorage.getItem('access_token')) {
            this.pageName = 'home-page'
            this.fetchAllTasks()
         } else {
            this.pageName = 'login-page'
         }
        },

        addTask(payload) {
            let access_token = localStorage.getItem('access_token')
            axios({
                url: `tasks`,
                method: 'POST',
                headers: {access_token},
                data: {
                    title: payload.title,
                    description: payload.description,
                    category: payload.category
                }
            }).then(data => {
                this.fetchAllTasks()
                this.pageName = 'home-page'
            }).catch(err => {
                console.log(err.response);
                // Swal.fire(`Error ${err.response.data}`, `You're not allowed to edit other users tasks.`, 'error')
            })
        },

        logout() {
            this.pageName = 'login-page'
            localStorage.removeItem('access_token')
        }

    },
    created() {
        // this.fetchAllTasks()
        this.checkLogin()
    }
}
</script>

<style>

</style>