let app = new Vue({
    el: "#app",
    data:{
        idTitle: "kanban",
        msg: "Back log",
        text: "Bish tis me data",
        pesan: "<h3>Testing bish </h3>",
        page: "login",
        title: "",
        progress: "",
        description: "",
        kanban: [
            
        ],
        user: {
            email:'',
            password:''
        }
    },
    methods: {
        switchPage(pageName){
            this.page = pageName
        },
        addKanban(){
            let data = {
                title = this.title,
                progress = this.progress,
                description = this.description,

            }
            this.kanban.push(data)
            this.title = ''
            this.progress = ''
            this.description = ''
        },
        login(){
            let payload = this.user
            
            // axios({
            //     url: 'localhost:3000/login',
            //     data: payload,
            //     method: POST
            // })
            // .then(result => {
            //     localStorage.setItem('access_token', result)
            // })
            // .catch(err => {
            //     console.log(err)
            // })
            localStorage.setItem('access_token', this.user.email)
            this.switchPage("home")
            this.user.email = ""
            this.user.password = ""
            
        },
        checkLogin(){
            if(localStorage.access_token){
                this.page = "home"
            }
            else {
                this.page = "login"
            }
        }
    },
    created (){
        // console.log(document.getElementById("kanban"), '<<< created')
        this.checkLogin()
    },
    mounted () {
        // console.log(document.getElementById("kanban"), '<<< mounted')
    }
})