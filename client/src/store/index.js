import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    email: ''
  },
  mutations: {
    SET_TASKS (state, payload) {
      state.tasks = payload
    },
    SET_EMAIL (state, email) {
      state.email = email
    }
  },
  actions: {
    fetchData ({ commit }, accessToken) {
      axios({
        url: 'http://localhost:3000/tasks',
        method: 'GET',
        headers: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyQSIsImVtYWlsIjoidXNlckBtYWlsLmNvbSIsImlhdCI6MTYwNTQ1NTQxOX0.uNydILxO1CzheesNyFSXb0cMITI51GsBw94pS2F4MSA' }
      })
        .then(response => {
          commit('SET_TASKS', response.data)
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    login ({ commit }, payload) {
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: { email: payload.email, password: payload.password }
      })
        .then(response => {
          console.log(response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTask ({ commit }, payload) {
      axios({
        url: 'http://localhost:3000/tasks',
        method: 'POST',
        data: { title: payload.title, category: payload.category },
        headers: { access_token: payload.accessToken }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {
  }
})
