import Vue from 'vue'
import App from './App.vue'

new Vue({
    render: h => h(App)
}).$mount('#app')

// let app = new Vue({
//     el: "#app",
//     data:{
//         idTitle: "kanban",
//         msg: "Back log",
//         text: "Bish tis me data",
//         pesan: "<h3>Testing bish </h3>",
//         page: "login",
//         server: "http://localhost:3000",
//         title: "",
//         progress: "",
//         description: "",
//         kanban: [],
//         userLogin: {
//             email:'',
//             password:''
//         },
//         userRegister: {
//             email:'',
//             password:''
//         }
//     },
//     computed: {
//         fullname(){
//             return this.firstname + ' ' + this.lastname
//         }
//     },
//     methods: {
//         switchPage(pageName){
//             this.page = pageName
//         },
//         addKanban(){
//             // let data = {
//             //     title = this.title,
//             //     progress = this.progress,
//             //     description = this.description,

//             // }
//             // this.kanban.push(data)
//             // this.title = ''
//             // this.progress = ''
//             // this.description = ''
//         },
//         login(){
//             let payload = this.userLogin
            
//             axios({
//                 url: 'localhost:3000/sign-in',
//                 data: payload,
//                 method: POST
//             })
//             .then(result => {
//                 localStorage.setItem('access_token', result.data)
//                 this.switchPage("home")
//                 this.userLogin.email = ""
//                 this.userLogin.password = ""
//             })
//             .catch(err => {
//                 console.log(err)
//             })
            
            
//         },
//         fetchtask(){
//             let url = this.server + "/tasks"
//             if (this.progress){
//                 url += `?progress=${this.progress}`
//             }
//             axios({
//                 url: url,
//                 method: "GET"
//             })
//             .then(result => {
//                 // console.log(result.data)
//                 this.kanban = result.data
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         },

//         checkLogin(){
//             if(localStorage.access_token){
//                 this.page = "home"
//                 this.fetchtask()
//             }
//             else {
//                 this.page = "login"
//             }
//         },
//         register() {
//             let payload = this.userRegister
            
//             axios({
//                 url: 'localhost:3000/sign-up',
//                 data: payload,
//                 method: POST
//             })
//             .then(result => {
//                 this.switchPage("login")
//                 this.userRegister.email = ""
//                 this.userRegister.password = ""
//             })
//             .catch(err =>{
//                 console.log(err)
//             })
//         }
//     },
//     watch: {
//         progress() {
//             this.fetchtask()
//         }
//     },
//     created (){
//         // console.log(document.getElementById("kanban"), '<<< created')
//         this.checkLogin()
//     },
//     mounted () {
//         // console.log(document.getElementById("kanban"), '<<< mounted')
//     }
// })