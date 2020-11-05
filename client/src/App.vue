<template>
  <div>
    <section id="main">
        <Homepage v-if="pageName == 'home-page'"></Homepage>
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
            pageName: 'register-page'
        }
    },
    components: {
        Homepage, RegisterPage, LoginPage, AddForm
    },

    methods: {
        login(payload) {
            console.log(payload.email, '<<<ini dari app')
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
                const token = localStorage.getItem('tokenAccess')
                
            })
            .catch(err => {
                console.log(err, 'yah eror')
            })
        }
    }
}
</script>

<style>

</style>