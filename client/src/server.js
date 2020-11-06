import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:3000'
})

module.exports = server
