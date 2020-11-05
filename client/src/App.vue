<template>
    <div>
        <taskpage @logout="logout" v-if="targetPage === 'task-page'" :dataTasks="tasks"></taskpage>
        <landingpage @register="register" @login="login" v-else-if="targetPage === 'landing-page'"></landingpage>
    </div>
</template>

<script>
import landingpage from './components/landingpage'
import taskpage from './components/taskpage'

export default {
    name: 'App',
    components: {
        landingpage,
        taskpage
    },
    data() {
        return {
            base_url: `http://localhost:3000`,
            message: 'Hello world',
            tasks: {
                backlogTasks: [],
                productionTasks: [],
                doneTasks: [],
                developmentTasks: []
            },
            targetPage: '',
        };
    },
    methods: {
        login(payload) {
            axios.post(`${this.base_url}/login`, {
                email: payload.email,
                password: payload.password 
            })
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                this.targetPage = 'task-page'
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        register(payload) {
            let user = this.newUser;
            axios.post(`${this.base_url}/register`, {
                email: payload.email,
                password: payload.password
            })
            .then(response => {
                console.log(response.data);
                let container = document.getElementById('container')
                container.classList.remove("right-panel-active");
            })
            .catch(error => {
                console.log(error);
            })
        },
        logout(value){
            this.targetPage = value;
        }
    },
    created() {
        axios.get(`${this.base_url}/tasks`, {
                headers: {access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW5zdXJAeWFob28uYWMiLCJpYXQiOjE2MDQ1NzQ5MTl9.lJ71tV-eVX-aC1KjDa3cFzYrIgqayqAbB1xXIdfzb8o'}
            })
            .then(response => {
                response.data.forEach((el) => {
                    if(el.category === 'backlog'){
                        this.tasks.backlogTasks.push(el);
                    } else if (el.category === 'production'){
                        this.tasks.productionTasks.push(el);
                    } else if (el.category === 'development'){
                        this.tasks.developmentTasks.push(el);
                    } else {
                        this.tasks.doneTasks.push(el);
                    }
                })
            })
            .catch(error => {
                this.tasks = error.response;
        });
        let access_token = localStorage.getItem('access_token')
        if(access_token){
            this.targetPage = 'task-page';
        } else {
            this.targetPage = 'landing-page';
        }
    }
};
</script>

<style scoped>
</style>