var app = new Vue({
  el: '#app',
  data: {
    logged: true,
    page: 'register',
    notification: 'ada',
    error: "true",
    email: "",
    password: "",
    confirmPassword: '',
    showModal: false,
    api: 'http://localhost:3000/'
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: this.api + 'users/login/',
        data: {
          email: this.email, password: this.password
        }
      }).then(data => {
        this.email = ""
        this.password = ""
        localStorage.setItem('access_token', data.data.access_token)
        this.logged = true
      }).catch(err => {
        // console.log(err);
        // console.log(err.toJSON())
      })
    },
    onSignIn: function(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
    },
    logout() {
      localStorage.removeItem('access_token')
      this.logged = false
    },
    register() {
      if(confirmPassword !== password) {
        
      }
    },
    form(input) {
      this.page = input 
    }
  },
  created() {
    let token = localStorage.getItem('access_token')
    if(token) this.logged = true
    else {
      this.logged = false
      this.page = "register"
    }
    console.log(localStorage.getItem('test'));
    console.log(localStorage.getItem('access_token'));
  },
})