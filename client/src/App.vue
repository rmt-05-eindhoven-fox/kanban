<template>
    <div>
        <taskpage @editTask="editTask" @patchTask="patchTask" @deleteTask="deleteTask" @submitTask="addTask" @logout="logout" v-if="targetPage === 'task-page'" :dataTasks="homeData"></taskpage>
        <landingpage @googleLogin="googleLogin" @register="register" @login="login" v-else-if="targetPage === 'landing-page'"></landingpage>
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
            base_url: `https://ramakanbannn.herokuapp.com`,
            message: 'Hello world',
            homeData: {
                backlogTasks: [],
                productionTasks: [],
                doneTasks: [],
                developmentTasks: [],
                email: '',
                username: ''
            },
            watchData: '',
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
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem('access_token', response.data.access_token);
                this.getUser();
                this.targetPage = 'task-page'
                this.fetchData();
                console.log(response.data);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
            })
        },
        register(payload) {
            axios.post(`${this.base_url}/register`, {
                username: payload.username,
                email: payload.email,
                password: payload.password
            })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Register Success',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(response.data);
                let container = document.getElementById('container')
                container.classList.remove("right-panel-active");
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
                console.log(error.response);
                console.log(payload.username);

            })
        },
        googleLogin(token){
            let google_access_token = token;
            axios({
                method: 'POST',
                url: `${this.base_url}/googleLogin`,
                data: {google_access_token}
            })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem('access_token', response.data.access_token);
                this.getUser();
                this.targetPage = 'task-page'
                this.fetchData()
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response);
            })
        },
        logout(value){
            Swal.fire({
                    icon: 'success',
                    title: 'Logout success',
                    showConfirmButton: false,
                    timer: 1500
            })
            this.targetPage = value;
            localStorage.removeItem('access_token');
        },
        addTask(payload){
            let access_token = localStorage.getItem('access_token')
            Swal.fire({
                title: 'Please wait!',
                text: '',
                imageUrl: 'public/images/ajax-progres.gif',
                imageWidth: 50,
                imageHeight: 50,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                allowOutsideClick: false
            })
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
                Swal.fire({
                    icon: 'success',
                    title: 'Your task has been added',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(response);
                this.watchData = response;
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
                console.log(error.response);
            })
        },
        deleteTask(id){
            let access_token = localStorage.getItem('access_token')
            Swal.fire({
                title: 'Please wait!',
                text: '',
                imageUrl: 'public/images/ajax-progres.gif',
                imageWidth: 50,
                imageHeight: 50,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                allowOutsideClick: false
            })
            axios({
                method: 'DELETE',
                url: `${this.base_url}/tasks/${id}`,
                headers: {access_token}
            })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your task has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.watchData = response;
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
                console.log(error.response);
            })
        },
        editTask(payload){
            let access_token = localStorage.getItem('access_token')
            Swal.fire({
                title: 'Please wait!',
                text: '',
                imageUrl: 'public/images/ajax-progres.gif',
                imageWidth: 50,
                imageHeight: 50,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                allowOutsideClick: false
            })
            axios({
                method: 'PUT',
                url: `${this.base_url}/tasks/${payload.id}`,
                headers: {access_token},
                data: {
                    title: payload.title,
                    description: payload.description,
                    category: payload.category
                }
            })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your task has been edited',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.watchData = response;
                console.log(response);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
                console.log(error);
            })
        },
        patchTask(payload){
            let access_token = localStorage.getItem('access_token');
            axios({
                method: 'PATCH',
                url: `${this.base_url}/tasks/${payload.id}`,
                headers: {access_token},
                data: {category: payload.category}
            })
            .then(response => {
                this.watchData = response;
                console.log(response)
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
                console.log(error);
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
                console.log(error.response)
            });
        },
        getUser(){
            let access_token = localStorage.getItem('access_token');
            axios({
                method: 'GET',
                url: `${this.base_url}/getUser`,
                headers: {access_token}
            })
            .then(response => {
                console.log(response.data);
                this.homeData.email = response.data.email;
                this.homeData.username = response.data.username;

            })
            .catch(error => {
                console.log(error.response);
            })
        }
    },
    created() {
        let access_token = localStorage.getItem('access_token')
        if(access_token){
            // this.homeData.email = payload.email;
            this.targetPage = 'task-page';
            this.getUser();
            this.fetchData();

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