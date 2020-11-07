import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mykanban-app.herokuapp.com'
})

export default instance