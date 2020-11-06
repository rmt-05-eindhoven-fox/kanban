const SERVER = 'http://localhost:3000'

let app = new Vue({
    el:'#app',
    data:{
        msg: 'DARRARARRARA',
        text: 'duarrrrr',
        page: 'login',
        tasks: [
            {
                id: 1,
                title: "Lagi males",
                description: "gajadi deng",
                category: "Backlog",
                email: "rafi@gail.com"
            },
            {
                id: 2,
                title: "tes 2 ",
                description: "gajadi deng",
                category: "Todo",
                email: "rafi@gail.com"
            },
            {
                id: 3,
                title: "tes 3",
                description: "gajadi deng",
                category: "Backlog",
                email: "rafi@gail.com"
            }
        ],
        userLogin: {
            email: '',
            password: ''
        },
        userRegis: {
            email: '',
            password: ''
        }
    },
    methods: {
        movePage(pageName) {
            this.page = pageName
        },
        login() {
           axios({
               url: SERVER + '/login',
               method: "POST",
               data: {
                   email: this.userLogin.email,
                   password: this.userLogin.password
               }
           }) 
                .then(res => {
                    localStorage.setItem('access_token', res.data.access_token)

                    this.movePage('home')

                    this.userLogin.email = ''
                    this.userLogin.password = ''
                })
                .catch(err => {
                    console.log(err)
                })
        },
        checkLogin() {
            if(localStorage.access_token) {
                this.page = 'home'
            } else {
                this.page = 'login'
            }
        },
        logout() {

            localStorage.removeItem('access_token')
            this.movePage('login')
        },
        register() {
            axios({
                url: SERVER + '/register',
                method: "POST",
                data: {
                    email: this.userRegis.email,
                    password: this.userRegis.password
                }
            }) 
                 .then(res => {
                     console.log(res.data)
 
                     this.movePage('login')
 
                     this.userRegis.email = ''
                     this.userRegis.password = ''
 
                     
                 })
                 .catch(err => {
                     console.log(err)
                 })
        }
    },
    created () {
        this.checkLogin()
    }
})



