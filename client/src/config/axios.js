import axios from "axios";

const instance = axios.create({
  baseURL: "https://kanban-is-superb.herokuapp.com",
});

export default instance;
