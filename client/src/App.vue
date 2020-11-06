<template>
    <div>
        <taskpage @submitTask="addTask" @logout="logout" v-if="targetPage === 'task-page'" :dataTasks="homeData"></taskpage>
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
            homeData: {
                backlogTasks: [],
                productionTasks: [],
                doneTasks: [],
                developmentTasks: [],
                email: ''
            },
            watchData: '',
            targetPage: '',
        };
    },
    methods: {
        login(payload) {
            this.homeData.email = payload.email;
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
        },
        addTask(payload){
            let access_token = localStorage.getItem('access_token')
            axios({
                method: 'POST',
                url: `${this.base_url}/tasks`,
                headers: {
                    access_token
                },
                data: {
                    title: payload.title,
                    description: payload.description,
                    category: payload.category
                }
            })
            .then(response => {
                console.log(response);
                this.watchData = response;
            }).catch(error => {
                console.log(error.response);
            })
        },
        fetchData(){
            axios.get(`${this.base_url}/tasks`, {
                headers: {access_token: localStorage.getItem('access_token')}
            })
            .then(response => {
                this.homeData.backlogTasks = [];
                this.homeData.developmentTasks = [];
                this.homeData.productionTasks = [];
                this.homeData.doneTasks = [];
                response.data.forEach((el) => {
                    if(el.category === 'backlog'){
                        this.homeData.backlogTasks.push(el);
                    } else if (el.category === 'production'){
                        this.homeData.productionTasks.push(el);
                    } else if (el.category === 'development'){
                        this.homeData.developmentTasks.push(el);
                    } else {
                        this.homeData.doneTasks.push(el);
                    }
                })
            })
            .catch(error => {
                this.tasks = error.response;
            });
        }
    },
    created() {
        this.fetchData();
        let access_token = localStorage.getItem('access_token')
        if(access_token){
            // this.homeData.email = payload.email;
            this.targetPage = 'task-page';
        } else {
            this.targetPage = 'landing-page';
        }
    },
    watch: {
        watchData() {
            this.fetchData();
        }
    }
};
</script>

<style scoped>
</style>