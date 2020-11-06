<template>
  <div>
    <navbarku
      @logout="logout"
      @add="addTask"
      :logged="logged"
      ></navbarku>
    <login 
      @google="googleLogin"
      @login="login"
      @form="move"
      v-if="!logged && page === 'login'"></login>
    <register 
      @form="move"
      @register="register"
      v-else-if="!logged && page === 'register'"></register>
    <home 
      :task="task"
      @editTask="editTask"
      @hapus="delTask"
      v-else-if="logged"></home>

    <modal v-model="success">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="h1">{{ msgSuccess }} Successfully</p>
        <img src="./assets/success.gif">
      </div>
    </modal>

    <modal v-model="error">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="h1">Error! {{ msgErr }}</p>
        <img src="./assets/error.gif">
      </div>
    </modal>

  </div>
</template>

<script>
import navbarku from './Navbar';
import login from "./Login";
import register from './Register';
import home from './Home';
import axios from "../config/axios";

export default {
  name: "App",
  data() {
    return {
      logged: '',
      page: 'register',
      task: false,
      success: false,
      error: false,
      msgSuccess: "",
      msgErr: "",
    }
  },
  components: {
    navbarku, login, home, register
  },
  methods: {
    logout(siji) {
      this.logged = siji
      this.page = 'login'
    },
    move(val) {
      this.page = val
    },
    login(user) {
      axios({
        method: 'post',
        url: "/users/login",
        data: user
      }).then(data => {
        localStorage.setItem('access_token', data.data.access_token)
        this.dataTask()
        this.logged = true
        this.goodNotif('Login')
      }).catch(err => {
        console.log(err.response.data);
      })
    },
    register(user) {
      console.log(user);
      axios({
        method: 'post',
        url: '/users/register',
        data: user
      }).then(result => {
        // notif registered or modal registered
        console.log(result.data);
      }).catch(err => {
        console.log(err.response);
      })
    },
    dataTask() {
      let token = localStorage.getItem('access_token')
      axios({
        method: 'get',
        url: '/tasks',
        headers: { access_token: token }
      }).then(result => {
        let temp = {}
        result.data.forEach(el => {
          if(!temp[el.category]) {
            temp[el.category] = [el]
          } else {
            temp[el.category].push(el)
          }
        })
        this.task = temp
      }).catch(err => {
        console.log(err, 'dari error');
      })
    },
    delTask(id) {
      let token = localStorage.getItem('access_token')
      axios({
        method: 'delete',
        url: '/tasks/' + id,
        headers: { access_token: token }
      }).then(res => {
        this.dataTask()
      }).catch(err => {
        console.log(err.response);
      })
    },
    editTask(data) {
      let token = localStorage.getItem('access_token')
      let { title, category } = data
      axios({
        method: "patch",
        url: '/tasks/' + data.id,
        headers: { access_token: token },
        data: { title, category }
      }).then(result => {
        this.dataTask()
      }).catch(err => {
        console.log(err.response);
      })
    },
    addTask(data) {
      let token = localStorage.getItem('access_token')
      let { title, category } = data
      axios({
        method: 'post',
        url: '/tasks/',
        headers: { access_token: token },
        data: { title, category }
      }).then(result => {
        this.dataTask()
      }).catch(err => {

        
      })
    },
    goodNotif(msg) {
      this.msgSuccess = msg
      setTimeout(() => {
        this.success = Boolean(msg)
      }, 500);
      setTimeout(() => {
        this.success = false
        this.msgSuccess = ""
      }, 2500);
      
    },
    badNotif(msg) {
      this.msgErr = msg
      setTimeout(() => {
        this.error = Boolean(msg)
      }, 500);
      setTimeout(() => {
        this.error = false
        this.msgErr = ""
      }, 2500);
    },
    googleLogin(idToken) {
      console.log(idToken, 'sampai sini');
      axios({
        method: 'post',
        url: '/users/googleLogin',
        headers: { id_token: idToken },
      }).then(result => {
        localStorage.setItem('access_token', result.data.access_token)
        this.dataTask()
        this.logged = true
        this.goodNotif('Login')
      }).catch(err => {
        this.badNotif('Login failed')
      })
    }
  },
  created() {
    let token = localStorage.getItem('access_token')
    if(token) {
      this.logged = true
      this.dataTask()
    }
    else {
      this.logged = false
      this.page = "register"
    }
  },
}
</script>

<style>

</style>
