let app = new Vue({
   el: '#app', 
   data: {
      pageName: 'create-task-page',
      server: 'http://localhost:3000/',
      count: 0,
      category: '',
      userLogin: {
         email: '',
         password: ''
      },
      userRegister: {
         username: '',
         email: '',
         password: ''
      },
      newTask: {
         title: '',
         description: '',
         category: ''
      },
      editTask: {},
      allTasks: []
   },
   methods: {
      changePage(name) {
         this.pageName = name
      },

      error404: function() {
         if(this.isCount) {
            setTimeout(() => {
               let count = 0
               for (let i = 0; i < 404; i++) {
                  this.count++
               }
           }, 1000)
         } else {
            setTimeout(() => {
               for (let i = 0; i < 404; i++) {
                  this.count++
               }
           }, 1000)
         }
      },

      login() {
         let user = this.userLogin
         
         axios({
            url: `${this.server}users/login`,
            method: 'POST',
            data: user
         }).then(res => {
            localStorage.setItem('access_token', res.data.access_token)
            this.changePage('homepage')
            this.userLogin.email = ''
            this.userLogin.password   = ''
            this.fetchAllTasks()
         }).catch(err => {
            console.log(err);
         })
         this.changePage('homepage')
         this.userLogin.email = ''
         this.userLogin.password   = ''
      },

      logout() {
         this.changePage('login-page')
         localStorage.removeItem('access_token')
      },

      register() {
         let user = this.userRegister
         
         axios({
            url: `${this.server}users/register`,
            method: 'POST',
            data: user
         }).then(res => {
            this.changePage('login-page')
            this.userRegister.username = ''
            this.userRegister.email = ''
            this.userRegister.password   = ''
            console.log(res);
         }).catch(err => {
            console.log(err);
         })
        
      },

      fetchAllTasks() {
         let access_token = localStorage.getItem('access_token')
         axios({
            url: `${this.server}tasks`,
            method: 'GET',
            headers: {access_token}
         }).then(res => {
            this.allTasks = res.data
         }).catch(err => {
            console.log(err);
         })
      },

      checkLogin() {
         if(localStorage.getItem('access_token')) {
            this.pageName = 'homepage'
            this.fetchAllTasks()
         } else {
            this.pageName = 'login-page'
         }
      },

      deleteTask(id) {
         let access_token = localStorage.getItem('access_token')
         axios({
            url: `${this.server}tasks/${id}`,
            method: 'DELETE',
            headers: {access_token}
         }).then(res => {
            this.fetchAllTasks()
         }).catch(err => {
            console.log(err);
         })
      },

      addTask(status) {
         let access_token = localStorage.getItem('access_token')
         axios({
            url: `${this.server}tasks`,
            method: 'POST',
            headers: {access_token},
            data: {
               title: 'TEST POST',
               description: 'coba coba',
               category: status
            }
         }).then(res => {
            this.fetchAllTasks()
            console.log(res);
         }).catch(err => {
            console.log(err);
         })
      },

      editTaskForm(id) {
         let access_token = localStorage.getItem('access_token')
         
         axios({
            url: `${this.server}tasks/${id}`,
            method: 'GET',
            headers: {access_token},
         }).then(res => {
            this.editTask = res.data
            this.changePage('edit-task-page')
         }).catch(err => {
            console.log(err);
         })
      },

      editTaskPost(id) {
         let access_token = localStorage.getItem('access_token')

         axios({
            url: `${this.server}tasks/${id}`,
            method: 'PUT',
            headers: {access_token},
            data: {
               title: this.editTask.title,
               description: this.editTask.description,
               category: this.editTask.category
            }
         }).then(res => {
            this.fetchAllTasks()
            this.changePage('homepage'),
            this.editTask = {}
         }).catch(err => {
            console.log(err);
         })
      },

      closeForm() {
         this.changePage('homepage')
      },
      
      editCategory(id, category) {
         let access_token = localStorage.getItem('access_token')

         // console.log(category);
         axios({
            url: `${this.server}tasks/${id}`,
            method: 'PATCH',
            headers: {access_token},
            data: {
               category: category
            }
         }).then(res => {
            this.fetchAllTasks()
         }).catch(err => {
            console.log(err);
         })
      },

      createTaskForm(category) {
         this.newTask.category = category

         this.changePage('create-task-page')
      },

      createTask() {
         let access_token = localStorage.getItem('access_token')

         let newTask = this.newTask
         axios({
            url: `${this.server}tasks`,
            method: 'POST',
            headers: {access_token},
            data: {
               title: newTask.title,
               description: newTask.description ,
               category: newTask.category
            }
         }).then(res => {
            // console.log(res);
            this.fetchAllTasks()
            this.changePage('homepage')
            this.newTask.title = ''
            this.newTask.category = ''
            this.newTask.description = ''
         }).catch(err => {
            console.log(err);
         })
      }
   },
   created () {
      this.error404()
      this.checkLogin()
   },
   
})
