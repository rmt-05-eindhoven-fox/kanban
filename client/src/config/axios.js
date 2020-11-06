import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://deo-kanban-app.herokuapp.com',

});

export default instance