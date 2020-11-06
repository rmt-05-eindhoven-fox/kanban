import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kanban-yosiaelnino.herokuapp.com',
});

export default instance