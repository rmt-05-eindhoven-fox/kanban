Vue.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: '<button v-on:click.prevent="count++">You\'ve hit me up {{count}} times</button>'
 })

// import Vue from "vue"
// import App from "./src/App.vue"

// new Vue({
//   render: h => h(App)
// }).$mount("#app")


let app = new Vue({
  el: '#app',
  data: {
    msg: 'Welcome to Phase 2!',
    BackLog:'Back Log Tasks',
    ToDo: 'To Do Tasks',
    OnProgress: 'Tasks On Progress',
    Completed: 'Completed Tasks',
    pageName: 'login',
    edit: '',
    logoUrl: 'https://i2.wp.com/d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2020/01/15094433/hacktiv8-1.png?fit=280%2C280&ssl=1',
    testUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSDAqoCBvk6jaZJhU5gxqSOA8xU4MyUPfY5g&usqp=CAU',
    testLoop: [
      {
        name: 'testLoop'
      }, {
        name: 'testing Vue For directive'
      }
    ],
    user: {
      email: '',
      username: '',
      password: ''
    },
    SERVER: 'http://localhost:3000'

  },
  methods: {
    changePage(name) {
      this.pageName = name
    },

    register() {
      let payload = this.user
    },

    login() {
      let payload = {
        username: this.user.username,
        password: this.user.password
      }

      axios({
        method: 'POST',
        url: SERVER + '/login',
        data: payload
      })
      .then(res => {

        localStorage.setItem('access_token', this.user.email)
      })
      .catch(err => {
        console.log(err)
      })

      localStorage.setItem('access_token', this.user.email);
      this.changePage('home')
      this.user.username = ''
      this.user.password = ''
    }
  }, 
  
  // computed: {
  //   fullName()
  // },

  created () {
    console.log(this.msg, '<<<< created')
  }, 

  beforeCreate () {
    console.log(this.msg, '<<<< beforeCreate')
  },

  mounted () {
    console.log(this.msg, '<<<< mounted')
  }
})