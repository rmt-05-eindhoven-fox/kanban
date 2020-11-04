let app = new Vue({
  el: '#app',
  data: {
    pageName: 'landingPage',
    login: true,
    email: '',
    password: '',
    imgUrl: './img/clip-hardworking-man.png',
    title: '',
    description: '',
    tag: '',
    kanban: []
  },
  methods: {
    changePage(name) {
      this.pageName = name
    },
    isLogin() {
      this.email = ''
      this.password = ''
      this.login = !this.login
    },
    logingIn() {
      const email = this.email
      const password = this.password
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email,
          password
        }
      })
        .then(res => {
          console.log(res)
          this.email = ''
          this.password = ''
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          this.checkLogin()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // onSignIn(googleUser) {
    //   const id_token = googleUser.getAuthResponse().id_token
    //   const profile = googleUser.getBasicProfile()
    //   console.log(id_token, profile)
    // },
    logout() {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      localStorage.clear()
      this.pageName = 'landingPage'
    },
    register() {
      const email = this.email
      const password = this.password
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          email,
          password
        }
      })
        .then(res => {
          this.email = ''
          this.password = ''
          this.login = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    addPage() {
      console.log('add')
      this.pageName = 'add'
    },
    addTask() {
      const title = this.title
      const description = this.description
      const tag = this.tag
      axios({
        method: 'POST',
        url: 'http://localhost:3000/kanban',
        data: {
          title,
          description,
          tag
        }
      })
        .then(res => {
          this.title = ''
          this.description = ''
          this.tag = ''

        })
        .catch(err => {
          console.log(err)
        })
    },
    show() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/kanban',
        header: {
          token: localStorage.getItem('token')
        }
      })
        .then(res => {
          this.kanban = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit() {
      const
    },
    delete() {

    },
    checkLogin() {
      if (localStorage.token) {
        this.pageName = 'content'
        this.show()
      } else {
        this.pageName = 'landingPage'
      }
    }
  },
  Created() {
    this.checkLogin()
    console.log(localStorage.token)
  }
})