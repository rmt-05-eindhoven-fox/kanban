import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban-bintangwm.herokuapp.com'
})

export default instance