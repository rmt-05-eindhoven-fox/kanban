import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:3521'
});

export default instance