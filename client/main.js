// console.log('masuk');
const SERVER = 'http://localhost:3000'
let app = new Vue({
  el: '#app',
  data: {
    first_name: '',
    last_name: '',
    logged_first_name: '',
    logged_last_name: '',
    email: '',
    password: '',
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    pageName: 'login-page',
    taskList: [],
    errors: ''
  },
  methods: {
    changePage(page_name) {
      this.pageName = page_name
    },
    register(){
      axios({
        method: 'post',
        url: SERVER + '/register',
        data: {
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        }
      })
      .then((response) => {
        this.email = ''
        this.password = ''
        this.last_name = ''
        this.first_name = ''
        this.changePage('login-page')
      })
      .catch(error => {
        console.log(error);
      });
    },
    login(){
      axios({
        method: 'post',
        url: SERVER + '/login',
        data: {
          email: this.email,
          password: this.password,
        }
      })
      .then((response) => {
        localStorage.setItem('logged_first_name', response.data.first_name)
        localStorage.setItem('logged_last_name', response.data.last_name)
        localStorage.setItem('access_token', response.data.access_token)
        this.logged_first_name = response.data.first_name
        this.logged_last_name = response.data.last_name
        this.email = ''
        this.password = ''
        this.changePage('main-page')
      })
      .catch(error => {
        // this.errors = error.data.msg
        console.log(error);
      });
    },
    logout() {
      localStorage.clear()
      this.logged_first_name = ''
      this.logged_last_name = ''
      this.pageName = 'login-page'
    },
    checkLogin() {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        this.fetchTasks()
        this.logged_first_name = localStorage.getItem('logged_first_name')
        this.logged_last_name = localStorage.getItem('logged_last_name')
        this.changePage('main-page')
      } else {
        this.changePage('login-page')
      }
    },
    fetchTasks() {
      const access_token = localStorage.getItem('access_token')
      axios({
        method: 'get',
        url: SERVER + '/tasks',
        headers: {
          access_token
        }
      })
        .then(response => {
          console.log(response.data);
          this.taskList = response.data
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  computed: {
    getFullName(){
      return this.logged_first_name + ' ' + this.logged_last_name
    }
  },
  created () {
    this.checkLogin()
  }
})