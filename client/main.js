let base_url = 'http://localhost:3000'
let app = new Vue({
    el:'#app',
    data: {
        cek: 'phase-2',
        msg: 'Hello World',
        text: 'Pesan',
        targetPage: 'home-page',
        user: {
            email: '',
            password: ''
        },
        newUser: {
            email: '',
            password: ''
        }
        
    },
    methods: {
        login() {
            let user = this.user;
            axios.post(`${base_url}/login`, {
                email: user.email,
                password: user.password 
            })
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                this.targetPage = 'home-page';
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        register() {
            let user = this.newUser;
            axios.post(`${base_url}/register`, {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        logout (){
            localStorage.removeItem('access_token');
            this.targetPage = 'landing'
        },
        registerSwitch(){
            container = document.getElementById('container')
            container.classList.add("right-panel-active");
        },
        loginSwitch(){
            container = document.getElementById('container')
            container.classList.remove("right-panel-active");
        }
    },
    created(){
        let access_token = localStorage.getItem('access_token')
        if(access_token){
            this.targetPage = 'home-page';
        } else {
            this.targetPage = 'landing';
        }
    },
    mounted() {
        console.log(document.getElementById("phase-2"))
    }
})

