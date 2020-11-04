let app = new Vue({
   el: '#app', 
   data: {
      pageName: 'login-page',
      server: 'http://localhost:3000/',
      count: 0,
      isCount: false,
      userLogin: {
         email: '',
         password: ''
      },
      userRegister: {
         username: '',
         email: '',
         password: ''
      },
      allTasks: [],
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
            console.log(res.data);
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
      }
   },
   created () {
      this.error404(),
      this.checkLogin()
   },
   
})
