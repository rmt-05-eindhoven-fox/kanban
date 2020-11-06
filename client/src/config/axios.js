import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://young-refuge-86223.herokuapp.com/'
})
// https://young-refuge-86223.herokuapp.com/
// http://localhost:3000/
export default instance