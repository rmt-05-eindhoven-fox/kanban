import axios from "axios"

const instance = axios.create({
  baseURL: "https://kanban-rs.herokuapp.com"
})

export default instance