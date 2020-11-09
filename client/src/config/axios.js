import axios from "axios";

const instance = axios.create({
  baseURL: "http://kanban-delvia.herokuapp.com",
});

export default instance;
