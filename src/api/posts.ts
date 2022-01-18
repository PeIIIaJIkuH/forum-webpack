import {ApiPromise, IReaction} from '../types'
import {defaultAxios} from './index'

const fetchAllPosts = (): ApiPromise => defaultAxios.get('posts')

const createPost = (title: string, content: string, categories: string[], isImage: boolean, imagePath: string): ApiPromise => defaultAxios.post('post/create', {
	title,
	content,
	categories,
	isImage,
	imagePath,
})

const ratePost = (postId: number, reaction: IReaction): ApiPromise => defaultAxios.post('post/rate', {
	id: postId,
	reaction,
})

const fetchPost = (postId: number): ApiPromise => defaultAxios.get(`post/${postId}`)

const fetchPostsByCategories = (categories: string[]): ApiPromise => defaultAxios.post('post/filter', {
	option: 'categories',
	categories,
})

const fetchUserPosts = (userId: number): ApiPromise => defaultAxios.post('post/filter', {
	option: 'author',
	authorID: userId,
})

const fetchRatedPosts = (userId: number, userRating: boolean): ApiPromise => defaultAxios.post('post/filter', {
	option: 'user',
	userID: userId,
	userRating: userRating ? 'upvoted' : 'downvoted',
})

const fetchCommentedPosts = (userId: number): ApiPromise => defaultAxios.post('comment/filter', {
	option: 'user',
	user_id: userId,
})

const deletePost = (postId: number): ApiPromise => defaultAxios.delete(`post/delete/${postId}`)

const editPost = (postId: number, authorId: number, title: string, content: string, categories: string[], isImage?: boolean, imagePath?: string): ApiPromise => defaultAxios.put('post/edit', {
	id: postId,
	authorID: authorId,
	title,
	content,
	categories,
	isImage,
	imagePath,
})

const uploadImage = (data: FormData, config: Record<string, any>): ApiPromise => defaultAxios.post('image/upload', data, config)

const deleteImage = (id: number): ApiPromise => defaultAxios.delete(`image/delete/${id}`)

const fetchCategories = (): ApiPromise => defaultAxios.get('categories')

export const postsAPI = {
	fetchAllPosts,
	createPost,
	ratePost,
	fetchPost,
	fetchPostsByCategories,
	fetchUserPosts,
	fetchRatedPosts,
	fetchCommentedPosts,
	deletePost,
	editPost,
	uploadImage,
	deleteImage,
	fetchCategories,
}
