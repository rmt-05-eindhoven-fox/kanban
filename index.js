
const SERVER = 'http://localhost:3000'


let app = new Vue({
  el: "#app",
  data: {
    message: "hello vue",
    pageName: "login",
    subPage: "cardLogin",
    userNameLogedIn: "",
    user: {
      email: "",
      password: ""
    },
    userRegister: {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    changePage(pageName) {
      this.pageName = pageName
    },
    changeSubPage(subPageName) {
      this.subPage = subPageName
    },
    login() {
      let userLogin = this.user
      axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: userLogin
      })
        .then(response => {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("name", response.data.name)
          this.changePage("mainPage")
          this.changePage("mainPage")
          this.userNameLogedIn = localStorage.name
          this.user.email = ""
          this.user.password = ""
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout() {
      this.pageName = "login"
      localStorage.removeItem("token")
      localStorage.removeItem("name")
    },
    register() {
      let newUser = this.userRegister
      axios({
        method: "POST",
        url: `${SERVER}/register`,
        data: newUser
      })
        .then(response => {
          console.log(response)
          this.changeSubPage("cardLogin")
          this.userRegister.name = ""
          this.userRegister.email = ""
          this.userRegister.password = ""
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {
    if (localStorage.token) {
      this.pageName = "mainPage"
      this.userNameLogedIn = localStorage.name
    } else {
      this.pageName = "login"
    }
  }
})