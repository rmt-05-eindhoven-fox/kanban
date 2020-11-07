let app = new Vue({
    el: '#app-vue',
    data: {
        pageName: 'login-page',
        tasks: [
            {
                id:1,
                title:"Mengerjakan Kanban",
                category:"backlog"
            },
            {

                id:2,
                title:"Mengerjakan Fancy Todo",
                category:"backlog"
            },
            {
                id:3,
                title:"Mengerjakan Kanban week3",
                category:"backlog"
            },
        ],
        addTask:{
            title: '',
            category: ''
        },
        user: {
            email: '',
            password: ''
        }
    },
    methods: {
        redirect(pageName){
            this.pageName = pageName
        },
        showFormAdd(){
            this.isShow = true
        },
        addTodo(){ //,masih error
            console.log('function addTodo');

            let data = this.addTask

            console.log(data);
            this.tasks.push(data)
            this.pageName = 'home-page'
        },
        login(){
            console.log('masuk login');
            let payload = this.user
            console.log(payload);
            // localStorage.setItem("access_token", token)
        }
    }
})

