import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getRating, groupBy, updateObjectInArray} from '../utils/helpers/helpers'
import {setProgress} from './app-reducer'
import history from '../history'
import {Reaction, TComment, TPost, TUser} from '../types/types'
import {ThunkDispatch} from 'redux-thunk'
import {ActionTypes, State} from './store'

type InitialState = {
	posts: TPost[] | null
	user: TUser | null
	comments: TComment[] | null
	postToEdit: TPost | null
	userComments: { [key: string]: TComment[] } | null
}
const initialState: InitialState = {
	posts: null,
	user: null,
	comments: null,
	postToEdit: null,
	userComments: null
}

type Action = ActionTypes<typeof postsActions>

const postsReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'posts/SET_POSTS':
			return {...state, posts: action.posts, comments: null}
		case 'posts/SET_RATING':
			const post = getObjectInArray(state.posts, action.id, 'id')
			const [userRating, postRating] = getRating(post.userRating, post.postRating, action.reaction)
			return {
				...state,
				posts: updateObjectInArray(state.posts, action.id, 'id',
					{postRating, userRating})
			}
		case 'posts/SET_USER':
			return {...state, user: action.user}
		case 'posts/SET_COMMENTS':
			return {...state, comments: action.comments}
		case 'posts/DELETE_POST':
			return {...state, posts: state.posts && state.posts.filter(post => post.id !== action.id)}
		case 'posts/SET_POST_TO_EDIT':
			return {...state, postToEdit: action.post}
		case 'posts/DELETE_COMMENT':
			return {
				...state,
				comments: state.comments && state.comments.filter((comment: TComment) => comment.id !== action.id)
			}
		case 'posts/SET_USER_COMMENTS':
			return {...state, userComments: action.comments}
		case 'posts/DELETE_USER_COMMENT':
			const id = action.id,
				postID = action.postID,
				comments = {...state.userComments}
			const postComments = comments[postID].filter((comment: TComment) => comment.id !== id)
			comments[postID] = postComments
			return {...state, userComments: comments}
		case 'posts/EDIT_COMMENT':
			if (state.comments) {
				const cComments = [...state.comments]
				const index = cComments && cComments.findIndex((comment: TComment) => comment.id === action.id)
				if (cComments) {
					cComments[index].content = action.content
				}
				return {...state, comments: cComments}
			}
			return state
		case 'posts/EDIT_USER_COMMENT':
			const ucComments = {...state.userComments}
			const pComments = [...ucComments[action.postID]]
			const uIndex = pComments.findIndex(comment => comment.id === action.id)
			pComments[uIndex].content = action.content
			ucComments[action.postID] = pComments
			return {...state, userComments: ucComments}
		case 'posts/SET_COMMENT_RATING':
			const comment = getObjectInArray(state.comments, action.id, 'id')
			const [commentUserRating, commentRating] = getRating(comment.userRating, comment.commentRating, action.reaction)
			return {
				...state,
				comments: updateObjectInArray(state.comments, action.id, 'id',
					{commentRating, userRating: commentUserRating})
			}
		default:
			return state
	}
}

const postsActions = {
	setPostsAC: (posts: TPost[] | null) => ({
		type: 'posts/SET_POSTS',
		posts
	} as const),
	setRatingAC: (id: number, reaction: Reaction) => ({
		type: 'posts/SET_RATING',
		id, reaction
	} as const),
	setUserAC: (user: TUser | null) => ({
		type: 'posts/SET_USER',
		user
	} as const),
	setCommentsAC: (comments: TComment[] | null) => ({
		type: 'posts/SET_COMMENTS',
		comments
	} as const),
	setUserCommentsAC: (comments: { [key: string]: TComment[] } | null) => ({
		type: 'posts/SET_USER_COMMENTS',
		comments
	} as const),
	deletePostAC: (id: number) => ({
		type: 'posts/DELETE_POST',
		id
	} as const),
	setPostToEditAC: (post: TPost | null) => ({
		type: 'posts/SET_POST_TO_EDIT',
		post
	} as const),
	deleteCommentAC: (id: number) => ({
		type: 'posts/DELETE_COMMENT',
		id
	} as const),
	deleteUserCommentAC: (id: number, postID: number) => ({
		type: 'posts/DELETE_USER_COMMENT',
		id, postID
	} as const),
	editCommentAC: (id: number, content: string) => ({
		type: 'posts/EDIT_COMMENT',
		id, content
	} as const),
	editUserCommentAC: (id: number, postID: number, content: string) => ({
		type: 'posts/EDIT_USER_COMMENT',
		id, postID, content
	} as const),
	setCommentRatingAC: (id: number, reaction: Reaction) => ({
		type: 'posts/SET_COMMENT_RATING',
		id, reaction
	} as const)
}

type Dispatch = ThunkDispatch<State, unknown, Action>

export type RequestAllPosts = () => void
export const requestAllPosts = () => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await postAPI.all()
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export type RequestUserPosts = (id: number) => void
export const requestUserPosts = (id: number) => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await userAPI.getCreatedPosts(id)
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(postsActions.setUserCommentsAC(null))
	await dispatch(postsActions.setUserCommentsAC(null))
	await dispatch(setProgress(100))
}

export type RequestRatedPosts = (userID: number, reaction: 'upvoted' | 'downvoted') => void
export const requestRatedPosts = (userID: number, reaction: 'upvoted' | 'downvoted') => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await userAPI.getRatedPosts(userID, reaction)
	await dispatch(postsActions.setPostsAC(data.data))
	await dispatch(postsActions.setUserCommentsAC(null))
	await dispatch(setProgress(100))
}

export type RequestPost = (id: number) => void
export const requestPost = (id: number) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.get(id)
	if (data.data) {
		await dispatch(postsActions.setPostsAC([data.data]))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export type RequestPostsByCategories = (categories: string[]) => void
export const requestPostsByCategories = (categories: string[]) => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await postAPI.getByCategories(categories)
	await dispatch(postsActions.setPostsAC(data.data))
	history.push('/by-categories')
	await dispatch(setProgress(100))
}

export type SetRating = (id: number, reaction: Reaction) => void
export const setRating = (id: number, reaction: Reaction) => async (dispatch: Dispatch) => {
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

export type RequestUser = (id: number) => void
export const requestUser = (id: number) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await userAPI.get(id)
	if (data.data) {
		await dispatch(postsActions.setUserAC(data.data))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export type RequestComments = (id: number) => void
export const requestComments = (id: number) => async (dispatch: Dispatch) => {
	const data = await postAPI.getComments(id)
	await dispatch(postsActions.setCommentsAC(data.data))
}

export type DeletePost = (id: number) => void
export const deletePost = (id: number) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.delete(id)
	if (data && data.status) {
		res = true
		await dispatch(postsActions.deletePostAC(id))
		await dispatch(postsActions.setCommentsAC(null))
	}
	await dispatch(setProgress(100))
	return res
}

export type SetPostToEdit = (post: TPost | null) => void
export const setPostToEdit = (post: TPost | null) => async (dispatch: Dispatch) => {
	dispatch(postsActions.setPostToEditAC(post))
}

export type RequestCommentedPosts = (id: number) => void
export const requestCommentedPosts = (id: number) => async (dispatch: Dispatch) => {
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
	await dispatch(postsActions.setUserCommentsAC(commentsByPostId))
	await dispatch(setProgress(100))
}

export type DeleteComment = (id: number, postID?: number) => void
export const deleteComment = (id: number, postID?: number) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.deleteComment(id)
	if (data && data.status) {
		res = true
		if (!postID) {
			await dispatch(postsActions.deleteCommentAC(id))
		} else {
			await dispatch(postsActions.deleteUserCommentAC(id, postID))
		}
	}
	await dispatch(setProgress(100))
	return res
}

export type EditComment = (id: number, authorID: number, postID: number, content: string, isUserPage: boolean) => void
export const editComment = (id: number, authorID: number, postID: number, content: string, isUserPage: boolean) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.editComment(id, authorID, postID, content)
	if (data && data.status) {
		res = true
		if (!isUserPage) {
			await dispatch(postsActions.editCommentAC(id, content))
		} else {
			await dispatch(postsActions.editUserCommentAC(id, postID, content))
		}
	}
	await dispatch(setProgress(100))
	return res
}

export type SetCommentRating = (id: number, postID: number, reaction: Reaction) => void
export const setCommentRating = (id: number, postID: number, reaction: Reaction) => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	let res = false
	const data = await postAPI.rateComment(id, postID, reaction)
	if (data && data.status) {
		res = true
		await dispatch(postsActions.setCommentRatingAC(id, reaction))
	}
	await dispatch(setProgress(100))
	return res
}

export default postsReducer