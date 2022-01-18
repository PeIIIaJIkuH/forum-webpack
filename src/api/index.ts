import axios from 'axios'

export const defaultAxios = axios.create({
	baseURL: 'https://localhost:8081/api/',
	// baseURL: 'http://139.59.211.109:8081/api/',
	withCredentials: true,
})

defaultAxios.interceptors.response.use(r => r.data, e => e.response?.data || {state: false})
