import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getRating, groupBy, updateObjectInArray} from '../utils/helpers/helpers'
import {setProgress} from './app-reducer'
import {Reaction, TPost} from '../types/types'
import {ActionTypes, ThunkType} from './store'
import {commentsActions} from './comments-reducer'

type InitialState = {
	all: TPost[] | null
	toEdit: TPost | null
}
const initialState: InitialState = {
	all: null,
	toEdit: null
}

type Action = ActionTypes<typeof postsActions | typeof commentsActions>

export const postsReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'posts/SET_POSTS':
			return {...state, all: action.all}
		case 'posts/SET_RATING':
			const post = getObjectInArray(state.all, action.id, 'id')
			const [userRating, postRating] = getRating(post.userRating, post.postRating, action.reaction)
			return {
				...state,
				all: updateObjectInArray(state.all, action.id, 'id',
					{postRating, userRating})
			}
		case 'posts/DELETE_POST':
			return {...state, all: state.all && state.all.filter(post => post.id !== action.id)}
		case 'posts/SET_POST_TO_EDIT':
			return {...state, toEdit: action.post}
		default:
			return state
	}
}

export const postsActions = {
	setPostsAC: (all: TPost[] | null) => ({
		type: 'posts/SET_POSTS',
		all
	} as const),
	setRatingAC: (id: number, reaction: Reaction) => ({
		type: 'posts/SET_RATING',
		id, reaction
	} as const),
	deletePostAC: (id: number) => ({
		type: 'posts/DELETE_POST',
		id
	} as const),
	setPostToEditAC: (post: TPost | null) => ({
		type: 'posts/SET_POST_TO_EDIT',
		post
	} as const)
}

type Thunk = ThunkType<void, Action>
type ThunkBool = ThunkType<boolean, Action>

export const requestAllPosts = (): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await postAPI.all()
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export const requestUserPosts = (id: number): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await userAPI.getCreatedPosts(id)
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(commentsActions.setUserCommentsAC(null))
	await dispatch(setProgress(100))
}

export type RequestRatedPosts = (userID: number, reaction: 'upvoted' | 'downvoted') => void
export const requestRatedPosts = (userID: number, reaction: 'upvoted' | 'downvoted'): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await userAPI.getRatedPosts(userID, reaction)
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(commentsActions.setUserCommentsAC(null))
	await dispatch(setProgress(100))
}

export type RequestPost = (id: number) => void
export const requestPost = (id: number): ThunkBool => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.get(id)
	if (data && data.status) {
		await dispatch(postsActions.setPostsAC([data.data]))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export type RequestPostsByCategories = (categories: string[]) => void
export const requestPostsByCategories = (categories: string[]): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await postAPI.getByCategories(categories)
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export type SetRating = (id: number, reaction: Reaction) => void
export const setRating = (id: number, reaction: Reaction): ThunkBool => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.rate(id, reaction)
	if (data && data.status) {
		res = true
		await dispatch(postsActions.setRatingAC(id, reaction))
	}
	await dispatch(setProgress(100))
	return res
}

export type DeletePost = (id: number) => void
export const deletePost = (id: number): ThunkBool => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.delete(id)
	if (data && data.status) {
		res = true
		await dispatch(postsActions.deletePostAC(id))
		await dispatch(commentsActions.setCommentsAC(null))
	}
	await dispatch(setProgress(100))
	return res
}

export const setPostToEdit = (post: TPost | null): Thunk => async dispatch => {
	dispatch(postsActions.setPostToEditAC(post))
}

export type RequestCommentedPosts = (id: number) => void
export const requestCommentedPosts = (id: number): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await userAPI.getCommentedPosts(id)
	const commentsByPostId = groupBy('post_id')(data.data)
	const posts = []
	for (const postID in commentsByPostId) {
		if (commentsByPostId.hasOwnProperty(postID)) {
			const data = await postAPI.get(postID)
			posts.push(data.data)
		}
	}
	await dispatch(postsActions.setPostsAC(posts))
	await dispatch(commentsActions.setUserCommentsAC(commentsByPostId))
	await dispatch(setProgress(100))
}
