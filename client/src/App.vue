<template>
    <div>
        <navbar 
        :PageName='PageName' 
        @changePage="changePage" 
        @logout="logout">
        </navbar> 
        <register 
        v-if="PageName === 'register'" 
        @changePage="changePage" 
        :server="server">
        </register>
        <login 
        v-else-if="PageName === 'login'" 
        @changePage="changePage" 
        :server="server">
        </login>
        <dashboard v-else-if="PageName === 'dashboard'" 
        @changePage="changePage" :tasks="tasks" 
        :server="server" 
        @listTasks="listTasks">
        </dashboard>
        <addTask v-else-if="PageName === 'addTask'"></addTask>
    </div>
</template>

<script>
import navbar from './components/Navbar'
import register from './components/Register'
import login from './components/Login'
import dashboard from './components/Dashboard'
import axios from 'axios'
export default {
    name: 'App',
    data() {
        return {
            server: 'https://khanban-hisyam.herokuapp.com/',
            PageName: 'login',
            tasks: []
        }
    },
    components:{
        navbar,
        register,
        login,
        dashboard
    },
    methods:{
        changePage(PageName) {
            this.PageName = PageName
            if (PageName === 'dashboard') {
                this.listTasks()
            }
        },
        logout() {
            this.PageName = 'login',
            localStorage.clear()
        },
        listTasks() {
            axios({
                method: 'GET',
                url: this.server + '/tasks',
                headers: {
                    access_token:localStorage.access_token
                }
            })
            .then(result => {
                this.tasks = result.data
            })
            .catch(err => {
                console.log(err.respone)
            })
        }
    },
    created() {
        if (localStorage.getItem('access_token')) {
            this.PageName = 'dashboard'
            this.listTasks()
        } else {
            this.PageName = 'login'
        }
    }
}
</script>

<style>

</style>