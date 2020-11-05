<template>
    <div>
        <LoginPage 
            v-if="page == 'login'" 
            class="container"
            @login="login"
            @changePage="changePage"
            @OnGoogleAuthSuccess="OnGoogleAuthSuccess"
            @OnGoogleAuthFail="OnGoogleAuthFail"
            :clientId="clientId"
            
        >
        </LoginPage>

        <RegisterPage 
            v-else-if="page == 'register'" 
            class="container"
            @register="register"
            @changePage="changePage"
        >
        </RegisterPage>

        <HomePage 
            v-else-if="page == 'home'"
            :categories="categories"
            :tasks="tasks"
            @changePage="changePage"
            @addTask="addTask"
            @toEditPage="toEditPage"
            :detailTask="detailTask"
            @editTask="editTask"
            @deleteTask="deleteTask"
            @logout="logout"
            :email="email"
        ></HomePage>
    </div>
  
</template>

<script>
import axios from './config/axios'
import HomePage from './components/Homepage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
export default {
    name: 'App',
    data() {
        return {
        page: 'login',
        categories: [
            {
                "category": "Backlog"
            },
            {
                "category": "Todo"
            },
            {
                "category": "Doing"
            },
            {
                "category": "Done"
            }
        ],
        tasks: [],
        detailTask: null,
        email: '',
        clientId: '312575173633-7k7pcrbnhf2ecv0tdj6cjrt8hr41upic.apps.googleusercontent.com'
        };
    },
    components: {
        HomePage, LoginPage, RegisterPage
    },
    methods: {
        login(payload) {
             axios({
                url: `/login`,
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
                .then(({data}) => {
                    localStorage.setItem('access_token', data.access_token)
                    this.email = data.email
                    this.page = 'home'

                    Toast.fire({
                        icon: 'success',
                        title: 'Log in successfully'
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.msg
                    })
                })
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken, 'token')
            // Receive the idToken and make your magic with the backend
            
            axios({
                url: `/googleLogin`,
                method: 'POST',
                data: {
                    access_token: idToken
                }
            })
             .then(({data}) => {
                    localStorage.setItem('access_token', data.access_token)
                    this.email = data.email
                    this.page = 'home'
                    this.googleToken = idToken
                    Toast.fire({
                        icon: 'success',
                        title: 'Log in successfully'
                    })
                })
            .catch(err => {
                console.log(err.response.data)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.msg
                })
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error, 'error')
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.msg
            })
        },
        checkLogin() {
            if(localStorage.access_token) {
                this.page = 'home'
                this.fetchTasks()
            } else {
                this.page = 'login'
            }
        },
        logout() {

            localStorage.removeItem('access_token')
            this.page = 'login'

            Toast.fire({
                icon: 'success',
                title: 'Log out successfully'
            })
        },
        register(payload) {
             axios({
                url: `/register`,
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
                .then(({data}) => {

                    this.page = 'login'
                    Toast.fire({
                        icon: 'success',
                        title: 'your account has been registered'
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.msg
                    })
                })
        },
        changePage(payload) {
            this.page = payload.name
        },
        toEditPage(payload) {
            this.detailTask = payload.task
        },
        editTask(payload) {
            axios({
                url: `/tasks/${payload.id}`,
                method: 'PUT',
                data: {
                    title: payload.title,
                    description: payload.description,
                    category: payload.category
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({data}) => {
                    this.page = 'home'
                    $('#edit-task').hide()
                    $('.modal-backdrop').hide()

                    this.fetchTasks()

                    Toast.fire({
                        icon: 'success',
                        title: 'Edit succesful'
                    })
                   
                })
                .catch(err => {
                    console.log(err.response.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.msg
                    })
                })
        },
        fetchTasks() {
            axios({
                url: '/tasks',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({data}) => {
                    
                    this.tasks = data
                })
                .catch(err => {
                    console.log(err.response.data , 'fetch app')
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.msg
                    })
                })
        },
        addTask(payload) {
            axios({
                url: '/tasks',
                method: 'POST',
                data: {
                    title: payload.title,
                    description: payload.description,
                    category: payload.category
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({data}) => {
                    this.fetchTasks()
                    $('#add-task').hide()
                    $('.modal-backdrop').hide()
                    this.page = 'home'

                    Toast.fire({
                        icon: 'success',
                        title: 'Task created'
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.msg
                    })
                })
        },
        deleteTask(payload) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#38d39f',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }) .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        axios({
                            url: `/tasks/${payload.task.id}`,
                            method: 'DELETE',
                            headers: {
                                access_token: localStorage.getItem('access_token')
                            }
                        }) 
                            .then(({data}) => {

                                this.fetchTasks()
                            
                            })
                            .catch(err => {
                                console.log(err.response.data)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: err.response.data.msg
                                })
                            })
                    }
                })  
          
        }
    },
    created() {
        
        this.checkLogin()
    }
};
</script>

<style>

</style>