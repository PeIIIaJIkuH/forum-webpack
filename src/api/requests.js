import axios from 'axios'

const defaultAxios = axios.create({
	baseURL: 'https://localhost:8081/api/',
	// baseURL: 'http://167.99.251.68:8081/api/',
	withCredentials: true
})

export const authAPI = {
	me: () => defaultAxios.get('auth/me').then(r => r.data).catch(() => undefined),
	signup: (username, email, password) => defaultAxios.post('auth/signup', {username, email, password})
		.then(r => r.data).catch(() => undefined),
	signin: (username, password) => defaultAxios.post('auth/signin', {username, password}).then(r => r.data)
		.catch(() => undefined),
	signout: () => defaultAxios.get('auth/signout').then(r => r.data).catch(() => undefined),
	getNotifications: () => defaultAxios.get('notifications')
		.then(r => r.data).catch(() => 'Can not load notifications.'),
	deleteNotification: () => defaultAxios.delete('notifications/delete/')
		.then(r => r.data).catch(() => 'Can not delete notifications.')
}

export const postAPI = {
	all: () => defaultAxios.get('posts').then(r => r.data).catch(() => 'Can not load posts.'),
	create: (title, content, categories) => defaultAxios.post('post/create', {title, content, categories})
		.then(r => r.data).catch(() => 'Can not create new post.'),
	rate: (id, reaction) => defaultAxios.post('post/rate', {id, reaction})
		.then(r => r.data).catch(() => 'Can not rate post.'),
	get: id => defaultAxios.get(`post/${id}`).then(r => r.data).catch(() => 'Can not load post.'),
	getComments: id => defaultAxios.post('comment/filter', {option: 'post', post_id: id})
		.then(r => r.data).catch(() => 'Can not load post comments.'),
	addComment: (id, content) => defaultAxios.post('comment/create', {post_id: id, content})
		.then(r => r.data).catch(() => 'Can not create new comment.'),
	getByCategories: categories => defaultAxios.post('post/filter', {option: 'categories', categories})
		.then(r => r.data).catch(() => 'Can not load posts by categories.'),
	delete: id => defaultAxios.delete(`post/delete/${id}`).then(r => r.data).catch(() => 'Can not delete post.'),
	edit: (id, authorID, title, content, categories) => defaultAxios.put('post/edit', {
		id, authorID, title, content, categories
	}).then(r => r.data).catch(() => 'Can not edit post.'),
	deleteComment: id => defaultAxios.delete(`comment/delete/${id}`)
		.then(r => r.data).catch(() => 'Can not delete comment.'),
	editComment: (id, authorID, post_id, content) => defaultAxios.put('comment/edit', {id, authorID, post_id, content})
		.then(r => r.data).catch(() => 'Can not edit comment.')
}

export const categoriesAPI = {
	all: () => defaultAxios.get('categories').then(r => r.data).catch(() => 'Can not load posts.')
}

export const userAPI = {
	get: id => defaultAxios.get(`user/${id}`).then(r => r.data).catch(() => 'Can not load user.'),
	getCreatedPosts: id => defaultAxios.post('post/filter', {option: 'author', authorID: id})
		.then(r => r.data).catch(() => 'Can not load created user posts.'),
	getRatedPosts: (userID, userRating) => defaultAxios.post('post/filter', {option: 'user', userID, userRating})
		.then(r => r.data).catch(() => 'Can not load rated user posts.'),
	getCommentedPosts: id => defaultAxios.post('comment/filter', {option: 'user', user_id: id})
		.then(r => r.data).catch(() => 'Can not load commented posts.')
}
