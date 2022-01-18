import {makeAutoObservable} from 'mobx'
import {ICategory, IPost, IReaction} from '../types'
import {getRating, groupBy} from '../utils/helpers'
import appState from './appState'
import {postsAPI} from '../api/posts'
import commentsState from './commentsState'

class PostsState {
	posts: IPost[] = []
	editing: IPost | null = null
	allCategories: ICategory[] = []
	selectedCategories: string[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setAllPosts(posts: IPost[] | null) {
		this.posts = posts || []
	}

	setPost(post: IPost | null) {
		this.posts = post ? [post] : []
	}

	setEditing(post: IPost | null) {
		this.editing = post
	}

	setAllCategories(categories: ICategory[] | null) {
		this.allCategories = categories || []
	}

	setSelectedCategories(categories: string[] | null) {
		this.selectedCategories = categories || []
	}

	setPostRating(post: IPost, userRating: IReaction, postRating: number) {
		post.userRating = userRating
		post.postRating = postRating
	}

	async fetchAllPosts() {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchAllPosts()
		appState.setProgress(100)
		if (status) {
			this.setAllPosts(data)
		}
	}

	async fetchUserPosts(userId: number) {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchUserPosts(userId)
		appState.setProgress(100)
		if (status) {
			this.setAllPosts(data)
			commentsState.setAllComments([])
		}
	}

	async fetchRatedPosts(userId: number, userRating: boolean) {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchRatedPosts(userId, userRating)
		appState.setProgress(100)
		if (status) {
			this.setAllPosts(data)
			commentsState.setAllComments([])
		}
	}

	async fetchPost(postId: number) {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchPost(postId)
		appState.setProgress(100)
		if (status) {
			this.setPost(data)
		}
		return status
	}

	async fetchPostsByCategories(categories: string[]) {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchPostsByCategories(categories)
		appState.setProgress(100)
		if (status) {
			this.setAllPosts(data)
		}
	}

	async fetchCommentedPosts(userId: number) {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchCommentedPosts(userId)
		appState.setProgress(100)
		if (status) {
			const commentsByPostId = groupBy('post_id')(data)
			const posts = []
			for (const postID in commentsByPostId) {
				if (commentsByPostId.hasOwnProperty(postID)) {
					const {data, status} = await postsAPI.fetchPost(+postID)
					if (status) {
						posts.push(data)
					}
				}
			}
			this.setAllPosts(posts)
			commentsState.setUserComments(commentsByPostId)
		}
	}

	// todo:
	// создать новйы эндпоинт для постов, с комментариями от какого-то пользователя

	async deletePost(postId: number) {
		appState.setProgress(0)
		const {status} = await postsAPI.deletePost(postId)
		appState.setProgress(100)
		if (status) {
			const filteredPosts = this.posts.filter(({id}) => postId !== id)
			this.setAllPosts(filteredPosts)
			commentsState.setAllComments([])
		}
		return status
	}

	async setRating(post: IPost, reaction: IReaction) {
		appState.setProgress(0)
		const {status} = await postsAPI.ratePost(post.id, reaction)
		appState.setProgress(100)
		if (status) {
			const [userRating, postRating] = getRating(post.userRating, post.postRating, reaction)
			this.setPostRating(post, userRating, postRating)
		}
		return status
	}

	async fetchAllCategories() {
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchCategories()
		appState.setProgress(100)
		if (status) {
			this.setAllCategories(data)
		}
	}

	async fetchEditing(postId: number) {
		if (isNaN(postId)) {
			return
		}
		appState.setProgress(0)
		const {data, status} = await postsAPI.fetchPost(postId)
		appState.setProgress(100)
		if (status) {
			this.setEditing(data)
		}
	}
}

export default new PostsState()