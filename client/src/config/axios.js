import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kanban-teguh.herokuapp.com'
});

export default instance;