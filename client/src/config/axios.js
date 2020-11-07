import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban999.herokuapp.com',
});

export default instance