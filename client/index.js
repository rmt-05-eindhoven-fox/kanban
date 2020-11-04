var app = new Vue({
  el: '#app',
  data: {
    pageName:'login',
    user:{
      first_name:'',
      lastname:'',
      email:'',
      password:''
    }
  },
  methods:{
    login(){
      this.pageName = 'content'
    },
    toRegister(){
      this.pageName = "register"
    },
    logout(){
      this.pageName = 'login'
    }

  }
})