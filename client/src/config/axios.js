import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://kanbaneko.herokuapp.com'
})

export default instance