import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban-dewi.herokuapp.com'
})

export default instance