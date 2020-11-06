let app = new Vue({
  el: '#app',
  data: {
    homePage: 'login',
    error: '',
    server: 'http://localhost:3000',
    user: {
      email: '',
      password: ''
    },
    tasks: [],
    task: {
      title: '',
      description: '',
      status: ''
    },
    backlog: false,
    todo: false,
    doing: false,
    finished: false
  },
  methods: {
    changePage (name) {
      this.homePage = name
    },
    login () {
      const payload = {
        email: this.user.email,
        password: this.user.password
      }

      axios({
        url: this.server + '/user/login',
        method: 'POST',
        data: payload
      })
      .then(result => {
        localStorage.setItem('token', result.data.access_token)
        this.afterLogin()
        this.user.email = ''
        this.user.password = ''
      })
      .catch(err => {
        console.log(err);
        this.showError (err.message);
      })
    },
    register () {
      const payload = {
        email: this.user.email,
        password: this.user.password
      }
      axios({
        url: this.server + '/user/register',
        method: 'POST',
        data: payload
      })
      .then(result => {
        console.log(result)
        localStorage.setItem('token', result.data.access_token)
        this.afterLogin()
        this.user.email = ''
        this.user.password = ''
      })
      .catch(err => {
        console.log(err);
        this.showError (err.message);
      })
    },
    afterLogin () {
      const token = localStorage.getItem('token')
      if (token) {
        this.changePage('content')
        this.fetchTask()
      }
      else {
        this.changePage('login')
      }
    },
    logout () {
      localStorage.removeItem('token');
      this.changePage('login')
    },
    showError (error) {
      this.error = error
      setTimeout(() => {
        this.err = ''
      }, 3000)
    },
    fetchTask () {
      const token = localStorage.getItem('token')
      axios({
        url: this.server + '/task',
        method: 'GET',
        headers: {
          access_token: token
        }
      })
      .then(result => {
        this.tasks = result.data
      })
      .catch(err => {
        console.log(err);
        this.showError (err.message);
      })
    },
    cancelForm () {
      this.backlog = false,
      this.todo = false,
      this.doing = false,
      this.finished = false
    },
    showForm (name) {
      console.log(name);
      if (name == 'backlog') {
        this.backlog = true
      } else if (name == 'todo') {
        this.todo = true
      } else if (name == 'doing') {
        this.doing = true
      } else if (name == 'finished') {
        this.finished = true
      }
    },
    addTask (name) {
      const token = localStorage.getItem('token')
      const payload = {
        title: this.task.title,
        description: this.task.description,
        status: name
      }

      axios({
        url: this.server + '/task',
        method: 'POST',
        headers: {
          access_token: token
        },
        data: payload
      })
      .then(result => {
        this.afterLogin()
        this.cancelForm()
        this.task.title = ''
        this.task.description = ''
      })
      .catch(err => {
        console.log(err);
        this.showError (err.message);
      })
    },
    deleteTask (id) {
      const token = localStorage.getItem('token')

      axios({
        url: this.server + `/task/${id}`,
        method: 'DELETE',
        headers: {
          access_token: token
        }
      })
      .then(result => {
        this.afterLogin()
      })
      .catch(err => {
        console.log(err);
        this.showError (err.message);
      })
    },
  },
  created () {
    this.afterLogin()
  }
})