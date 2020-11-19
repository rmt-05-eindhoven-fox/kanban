import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(Vuex)
Vue.use(VueSweetalert2)

export default new Vuex.Store({
  state: {
    tasks: [],
    email: '',
    watchData: ''
  },
  mutations: {
    SET_TASKS (state, payload) {
      state.tasks = payload
    },
    SET_EMAIL (state, email) {
      state.email = email
    },
    SET_WATCH_DATA (state, payload) {
      state.watchData = payload
    }
  },
  actions: {
    fetchData ({ commit }, accessToken) {
      Vue.swal.showLoading()
      axios({
        url: 'http://localhost:3000/tasks',
        method: 'GET',
        headers: { access_token: accessToken }
      })
        .then(response => {
          Vue.swal.close()
          commit('SET_TASKS', response.data)
          console.log(response.data)
        })
        .catch(err => {
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
          console.log(err.response)
        })
    },
    login ({ commit }, payload) {
      Vue.swal.showLoading()
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: { email: payload.email, password: payload.password }
      })
        .then(response => {
          Vue.swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login Success!'
          })
          console.log(response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
          console.log(err)
        })
    },
    register ({ commit }, payload) {
      Vue.swal.showLoading()
      axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: { username: payload.username, email: payload.email, password: payload.password }
      })
        .then(response => {
          Vue.swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Register Success!'
          })
          console.log(response.data)
        })
        .catch(err => {
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
          console.log(err)
        })
    },
    addTask ({ commit }, payload) {
      Vue.swal.showLoading()
      axios({
        url: 'http://localhost:3000/tasks',
        method: 'POST',
        data: { title: payload.title, category: payload.category },
        headers: { access_token: payload.accessToken }
      })
        .then(response => {
          Vue.swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Task added successfully!'
          })
          console.log(response.data)
        })
        .catch(err => {
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
          console.log(err.response)
        })
    },
    editTask ({ commit }, payload) {
      Vue.swal.showLoading()
      axios({
        url: `http://localhost:3000/tasks/${payload.id}`,
        method: 'PUT',
        data: { title: payload.title, category: payload.category },
        headers: { access_token: payload.accessToken }
      })
        .then(response => {
          Vue.swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Task edited successfully!'
          })
          commit('SET_WATCH_DATA', response.data)
          console.log(response.data)
        })
        .catch(err => {
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
          console.log(err.response)
        })
    },
    deleteTask ({ commit }, payload) {
      Vue.swal.showLoading()
      axios({
        url: `http://localhost:3000/tasks/${payload.id}`,
        method: 'DELETE',
        headers: { access_token: payload.accessToken }
      })
        .then(response => {
          Vue.swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Task deleted successfully!'
          })
          commit('SET_WATCH_DATA', Math.random(50))
          console.log(response.data)
        })
        .catch(err => {
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
          console.log(err.response)
        })
    },
    patchTask ({ commit }, payload) {
      Vue.swal.showLoading()
      axios({
        url: `http://localhost:3000/tasks/${payload.id}`,
        method: 'PATCH',
        headers: { access_token: payload.accessToken },
        data: { category: payload.category }
      })
        .then(response => {
          Vue.swal.close()
          commit('SET_WATCH_DATA', Math.random(50))
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
          Vue.swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    googleLogin ({ commit }, token) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        data: { google_access_token: token }
      })
        .then(response => {
          Vue.swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token)
          router.push('/')
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  modules: {
  }
})
