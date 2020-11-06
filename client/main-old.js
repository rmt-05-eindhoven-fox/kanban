new Vue({
  el: '#app',
  data: {
    server : 'http://localhost:3000',
    message: 'Hello Vue.js!',
    debugDeo : 'Debugging',
    pageName : 'page-login',
    login : {
      email : '',
      password : '',
    },
    register : {
      name : '',
      email : '',
      password : ''
    },
    tasks : [
      {
        id: 3,
        description: "Seeded task",
        showEdit : false,
        UserId: 1,
        CategoryId: 1,
        User: {
            "id": 1,
            "name": "Deo Mareza",
            "email": "deo@mail.com"
        }
      },

      {
        id : 2,
        description : 'Task number two',
        showEdit : false,

        UserId: 1,
        CategoryId: 2,
        User: {
            "id": 1,
            "name": "Deo Mareza",
            "email": "deo@mail.com"
        }
      },
      {
        id : 1,
        description : 'Task numero Tiga',
        showEdit : false,

        UserId: 1,
        CategoryId: 3,
        User: {
            "id": 2,
            "name": "Clara Okt",
            "email": "deo@mail.com"
        }
      },
      {
        id : 4,
        description : 'Task nomer Empat',
        showEdit : false,

        UserId: 1,
        CategoryId: 4,
        User: {
            "id": 1,
            "name": "Deo Mareza",
            "email": "deo@mail.com"
        }
      }

    ],
    categories : [
      {
        id: 1,
        name: "Backlog",
        showAddTask : false,
        newTask : ''
      },
      {
        id : 2,
        name : 'Todo',
        showAddTask : false,
        newTask : ''

      }, 
      {
        id : 3,
        name : 'Doing',
        showAddTask : false,
        newTask : ''


      }, 
      {
        id : 4,
        name : 'Done',
        showAddTask : false,
        newTask : ''

      }
    ]
  },
  


  methods : {


    changePage(pageName){
      this.pageName = pageName
    },

    // USER REGISTER / LOGIN 💁 //

    userRegister(){
      const { name, email, password } = this.register

      axios({
        method : 'POST',
        url : this.server + `/user/register`,
        data : {
          name, email, password
        }
      })
      .then(_=>{
        console.log('registration successfull')
        this.register.name = ''
        this.register.email = ''
        this.register.password = ''

        this.changePage('page-login')
      })
      .catch(err => {

        console.log(err.response.data.message)
     
      })
    
    },

    userLogin(){
      const { email, password } = this.login

      axios({
        method : `POST`,
        url : this.server + `/user/login`,
        data : {
          email, password
        }
      })
      .then(response => {

        const {access_token} = response
        localStorage.setItem('access_token', access_token)

        this.login = '',
        this.password = ''

        this.changePage('page-home')

      })
      .catch(err => {
        console.log(err.response.data.message)
      })
    },


    userLogout(){
      localStorage.clear()
      this.changePage('page-login')
    },

    // TASK AND HOME FUNCTIONS 👷 //

    getCategory(categoryId){
      return this.categories.filter( el => el.id == categoryId )[0]
    },

    getTask(taskId){
      return this.tasks.filter( el => el.id == taskId )[0]
    },

    showEditTask(taskId){
      // const task = this.tasks.filter( el => el.id === taskId)[0]
      const task = this.getTask(taskId)
      console.log(task)

      task.showEdit = true
      this.debugDeo = `Edit task with Id : ${taskId}`
    },

    postEditTask(taskId){
      const task = this.tasks.filter( el => el.id === taskId)[0]
      task.showEdit = false;
    },


    showAddTask(categoryId){
      const category = this.getCategory(categoryId)
      category.showAddTask = true
    },

    postAddTask(categoryId){
      const category = this.getCategory(categoryId)
      category.showAddTask = false;
    },


    deleteTask(taskId){
      this.tasks = this.tasks.filter(el => el.id !== taskId)

    }


  },

  created() {
    const token = localStorage.getItem('access_token')
    if(token){
      this.changePage('page-home')
      // call tasks

    }
  }

})