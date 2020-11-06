<template>
  <div>
    <section id="main">
        <Homepage
        :categories='titles'
        :tasks='tasks'
         @signout='signOut' v-if="pageName == 'home-page'"></Homepage>
        <RegisterPage @register='register' v-else-if="pageName == 'register-page'"></RegisterPage>
        <LoginPage @login='login' v-else-if="pageName == 'login-page'"></LoginPage>
        <AddForm v-else-if="pageName == 'add-page'"></AddForm>

    <section v-else>
    <h1>Page not found !</h1>
    </section>
    </section>
  </div>
</template>



<script>

import Homepage from './components/Homepage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import AddForm from './components/AddForm'
import axios from './config/axios'
export default {
    name: 'App',
    data() {
        return {
            msg: 'KanbanApp',
            pageName: "login-page",
            titles: [
                {
                    'title': 'Backlog'
                },
                {
                    'title': 'Todo'
                },
                {
                    'title': 'Doing'
                },
                {
                    'title': 'Completed'
                }
            ],
            tasks: []
        }
    },
    components: {
        Homepage, RegisterPage, LoginPage, AddForm
    },

    methods: {
        checkLogin() {
            if(localStorage.tokenAccess) {
                this.changePage('home-page')
                this.fetchTask()
            } else {
                this.changePage('login-page')
            }
        },
        login(payload) {
            //console.log(payload.email, '<<<ini dari app')
            axios({
                url: '/login',
                method: 'post',
                
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(response => {
                //console.log(response, 'ini dapet')
                this.changePage('home-page')
                const token = response.data.tokenAccess
                //console.log(token)
                localStorage.setItem('tokenAccess',token )
            })
            .catch(err => {
                console.log(err, 'ini eror')
                //this.changePage('')
            })
        },
        changePage(name) {
            this.pageName = name
        },
        register(payload) {
            //console.log(payload, 'ada data')
            axios({
                url: '/register',
                method: 'post',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(response => {
                //console.log(response, 'yeay dapet response')
                this.changePage('login-page')
            })
            .catch(err => {
                console.log(err, 'yah eror')
            })
        },
        signOut() {
            localStorage.removeItem('tokenAccess')
            this.changePage('login-page')
        },
        fetchTask() {
            axios({
                url: '/todos',
                method: 'get',
                headers: {
                         token: localStorage.tokenAccess
                        }
            })
            .then(({data}) => {
                this.tasks = data
            })
            .catch(err => {
                console.log(err.response, '<<<< error fetch')
            })
        }
    },
    created() {
        this.checkLogin()
    },
}
</script>

<style>

</style>