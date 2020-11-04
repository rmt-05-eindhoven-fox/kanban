var app = new Vue({
  el: '#app',
  data: {
    login: "",
    email: "",
    password: "",
    api: 'http://localhost:3000/'
  },
  methods: {
    checkLogin: function() {
      const login = localStorage.getItem('access_token')
      if(!login) login = false
      else login = true
    },
    loginClick:function() {
      axios({
        method: "post",
        url: this.api + 'users/login/',
        data: {
          email: this.email, password: this.password
        }
      }).then(data => {
        localStorage.setItem('access_token', data.data.access_token)
        console.log(data.data)
      }).catch(err => {
        // console.log(err);
        // console.log(err.toJSON())
      })
    },
    onSignIn: function(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
    },
    logoutClick: function() {
      localStorage.removeItem('access_token')
    }  
  }
})