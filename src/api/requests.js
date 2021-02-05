import * as axios from 'axios'

const defaultAxios = axios.create({
	baseURL: 'http://localhost:8081/api/',
	withCredentials: true
})

export const authAPI = {
	me: () => defaultAxios.get('auth/me').then(r => r.data).catch(() => undefined),
	signup: (username, email, password) => defaultAxios.post('auth/signup', {username, email, password})
		.then(r => r.data),
	signin: (username, password) => defaultAxios.post('auth/signin', {username, password}).then(r => r.data)
		.catch(() => undefined),
	signout: () => defaultAxios.get('auth/signout').then(r => r.data).catch(() => undefined)
}

export const postAPI = {
	all: () => defaultAxios.get('posts').then(r => r.data).catch(() => 'Can not load posts.'),
	create: (title, content, categories) => defaultAxios.post('post/create', {
		title,
		content,
		categories
	}).then(r => r.data)
		.catch(() => 'Can not create new post.'),
	rate: (id, reaction) => defaultAxios.post('post/rate', {
		id,
		reaction
	}).then(r => r.data).catch(() => 'Can not rate post.'),
	get: id => defaultAxios.get(`post/${id}`).then(r => r.data).catch(() => 'Can not load post.')
}

export const categoriesAPI = {
	all: () => defaultAxios.get('categories').then(r => r.data).catch(() => 'Can not load posts.')
}