import axios from 'axios'
import authState from '../store/authState'

export const defaultAxios = axios.create({
	baseURL: 'https://localhost:8081/api/',
	withCredentials: true,
	timeout: 10000,
})

defaultAxios.interceptors.response.use(
	(r) => r.data,
	(e) => e.response?.data || {state: false, data: null},
)

export const updatingAxios = axios.create({
	baseURL: 'https://localhost:8081/api/',
	withCredentials: true,
	timeout: 10000,
})

updatingAxios.interceptors.response.use(
	async (r) => {
		await authState.fetchUserData()
		return r.data
	},
	(e) => e.response?.data || {state: false, data: null},
)
