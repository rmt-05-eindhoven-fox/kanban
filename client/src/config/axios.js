import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kanban-porto-app.herokuapp.com',
});

export default instance;