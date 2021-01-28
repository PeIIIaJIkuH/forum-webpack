import * as axios from 'axios'

const defaultAxios = axios.create({
	baseURL: 'http://localhost:8081/api/',
	withCredentials: true
})

export const authAPI = {
	me: () => defaultAxios.get('auth/me').then(r => r.data)
		.catch(() => undefined),
	signup: (username, email, password) => defaultAxios.post('auth/signup', {username, email, password})
		.then(r => r.data),
	signin: (username, password) => defaultAxios.post('auth/signin', {username, password}).then(r => r.data),
	signout: () => defaultAxios.get('auth/signout').then(r => r.data)
}