import {ApiPromise, IReaction} from '../types'
import {defaultAxios, updatingAxios} from './index'

const fetchAllPosts = (): ApiPromise => updatingAxios.get('posts')

const createPost = (title: string, content: string, categories: string[], isImage: boolean,
                    imagePath: string): ApiPromise => updatingAxios.post('post/create', {
	title,
	content,
	categories,
	isImage,
	imagePath,
})

const ratePost = (postId: number, reaction: IReaction): ApiPromise => updatingAxios.post('post/rate', {
	id: postId,
	reaction,
})

const fetchPost = (postId: number): ApiPromise => updatingAxios.get(`post/${postId}`)

const fetchPostsByCategories = (categories: string[]): ApiPromise => updatingAxios.post('post/filter', {
	option: 'categories',
	categories,
})

const fetchUserPosts = (userId: number): ApiPromise => updatingAxios.post('post/filter', {
	option: 'author',
	authorID: userId,
})

const fetchRatedPosts = (userId: number, userRating: boolean): ApiPromise => updatingAxios.post('post/filter', {
	option: 'user',
	userID: userId,
	userRating: userRating ? 'upvoted' : 'downvoted',
})

const fetchCommentedPosts = (userId: number): ApiPromise => updatingAxios.post('comment/filter', {
	option: 'user',
	user_id: userId,
})

const deletePost = (postId: number): ApiPromise => updatingAxios.delete(`post/delete/${postId}`)

const editPost = (postId: number, authorId: number, title: string, content: string, categories: string[],
                  isImage?: boolean, imagePath?: string): ApiPromise => updatingAxios.put('post/edit', {
	id: postId,
	authorID: authorId,
	title,
	content,
	categories,
	isImage,
	imagePath,
})

const uploadImage = (data: FormData, config: Record<string, any>): ApiPromise => updatingAxios.post('image/upload',
	data, config)

const deleteImage = (id: number): ApiPromise => updatingAxios.delete(`image/delete/${id}`)

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
