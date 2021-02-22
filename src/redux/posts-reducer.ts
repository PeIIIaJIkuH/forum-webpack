import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getPostRating, groupBy, updateObjectInArray} from '../utils/helpers/helpers'
import {setProgress} from './app-reducer'
import history from '../history'
import {Reaction, TComment, TPost, TUser} from '../types/types'
import {ThunkDispatch} from 'redux-thunk'
import {State} from './store'

const SET_POSTS = 'posts/SET_POSTS',
	SET_RATING = 'posts/SET_RATING',
	SET_USER = 'posts/SET_USER',
	DELETE_POST = 'posts/DELETE_POST',
	SET_POST_TO_EDIT = 'posts/SET_POST_TO_EDIT',
	SET_COMMENTS = 'posts/SET_COMMENTS',
	SET_USER_COMMENTS = 'posts/SET_USER_COMMENTS',
	DELETE_COMMENT = 'posts/DELETE_COMMENT',
	DELETE_USER_COMMENT = 'posts/DELETE_USER_COMMENT',
	EDIT_COMMENT = 'posts/EDIT_COMMENT',
	EDIT_USER_COMMENT = 'posts/EDIT_USER_COMMENT'

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

type Action = SetPostsAC | SetRatingAC | SetUserAC | SetCommentsAC | DeletePostAC | SetPostToEditAC | DeleteCommentAC |
	SetUserCommentsAC | DeleteUserCommentAC | EditCommentAC | EditUserCommentAC

const postsReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case SET_POSTS:
			return {...state, posts: action.posts, comments: null}
		case SET_RATING:
			const post = getObjectInArray(state.posts, action.id, 'id')
			const [userRating, postRating] = getPostRating(post.userRating, post.postRating, action.reaction)
			return {
				...state,
				posts: updateObjectInArray(state.posts, action.id, 'id',
					{postRating, userRating})
			}
		case SET_USER:
			return {...state, user: action.user}
		case SET_COMMENTS:
			return {...state, comments: action.comments}
		case DELETE_POST:
			return {...state, posts: state.posts && state.posts.filter(post => post.id !== action.id)}
		case SET_POST_TO_EDIT:
			return {...state, postToEdit: action.post}
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments && state.comments.filter((comment: TComment) => comment.id !== action.id)
			}
		case SET_USER_COMMENTS:
			return {...state, userComments: action.comments}
		case DELETE_USER_COMMENT:
			const id = action.id,
				postID = action.postID,
				comments = {...state.userComments}
			const postComments = comments[postID].filter((comment: TComment) => comment.id !== id)
			comments[postID] = postComments
			return {...state, userComments: comments}
		case EDIT_COMMENT:
			if (state.comments) {
				const cComments = [...state.comments]
				const index = cComments && cComments.findIndex((comment: TComment) => comment.id === action.id)
				if (cComments) {
					cComments[index].content = action.content
				}
				return {...state, comments: cComments}
			}
			return state
		case EDIT_USER_COMMENT:
			const ucComments = {...state.userComments}
			const pComments = [...ucComments[action.postID]]
			const uIndex = pComments.findIndex(comment => comment.id === action.id)
			pComments[uIndex].content = action.content
			ucComments[action.postID] = pComments
			return {...state, userComments: ucComments}
		default:
			return state
	}
}

type SetPostsAC = {
	type: typeof SET_POSTS
	posts: TPost[] | null
}
const setPostsAC = (posts: TPost[] | null): SetPostsAC => ({
	type: SET_POSTS,
	posts
})

type SetRatingAC = {
	type: typeof SET_RATING
	id: number
	reaction: Reaction
}
const setRatingAC = (id: number, reaction: Reaction): SetRatingAC => ({
	type: SET_RATING,
	id, reaction
})

type SetUserAC = {
	type: typeof SET_USER
	user: TUser | null
}
const setUserAC = (user: TUser | null): SetUserAC => ({
	type: SET_USER,
	user
})

type SetCommentsAC = {
	type: typeof SET_COMMENTS
	comments: TComment[] | null
}
const setCommentsAC = (comments: TComment[] | null): SetCommentsAC => ({
	type: SET_COMMENTS,
	comments
})

type SetUserCommentsAC = {
	type: typeof SET_USER_COMMENTS
	comments: { [key: string]: TComment[] } | null
}
const setUserCommentsAC = (comments: { [key: string]: TComment[] } | null): SetUserCommentsAC => ({
	type: SET_USER_COMMENTS,
	comments
})

type DeletePostAC = {
	type: typeof DELETE_POST
	id: number
}
const deletePostAC = (id: number): DeletePostAC => ({
	type: DELETE_POST,
	id
})

type SetPostToEditAC = {
	type: typeof SET_POST_TO_EDIT
	post: TPost | null
}
const setPostToEditAC = (post: TPost | null): SetPostToEditAC => ({
	type: SET_POST_TO_EDIT,
	post
})

type DeleteCommentAC = {
	type: typeof DELETE_COMMENT
	id: number
}
const deleteCommentAC = (id: number): DeleteCommentAC => ({
	type: DELETE_COMMENT,
	id
})

type DeleteUserCommentAC = {
	type: typeof DELETE_USER_COMMENT
	id: number
	postID: number
}
const deleteUserCommentAC = (id: number, postID: number): DeleteUserCommentAC => ({
	type: DELETE_USER_COMMENT,
	id, postID
})

type EditCommentAC = {
	type: typeof EDIT_COMMENT
	id: number
	content: string
}
const editCommentAC = (id: number, content: string): EditCommentAC => ({
	type: EDIT_COMMENT,
	id, content
})

type EditUserCommentAC = {
	type: typeof EDIT_USER_COMMENT
	id: number
	postID: number
	content: string
}
const editUserCommentAC = (id: number, postID: number, content: string): EditUserCommentAC => ({
	type: EDIT_USER_COMMENT,
	id, postID, content
})

type Dispatch = ThunkDispatch<State, unknown, Action>

export type RequestAllPosts = () => void
export const requestAllPosts = () => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await postAPI.all()
	await dispatch(setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export type RequestUserPosts = (id: number) => void
export const requestUserPosts = (id: number) => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await userAPI.getCreatedPosts(id)
	await dispatch(setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export type RequestRatedPosts = (userID: number, reaction: Reaction) => void
export const requestRatedPosts = (userID: number, reaction: Reaction) => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await userAPI.getRatedPosts(userID, reaction)
	await dispatch(setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export type RequestPost = (id: number) => void
export const requestPost = (id: number) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.get(id)
	if (data.data) {
		await dispatch(setPostsAC([data.data]))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export type RequestPostsByCategories = (categories: string[]) => void
export const requestPostsByCategories = (categories: string[]) => async (dispatch: Dispatch) => {
	console.log('requesting data by ', categories)
	await dispatch(setProgress(0))
	const data = await postAPI.getByCategories(categories)
	await dispatch(setPostsAC(data.data))
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
		await dispatch(setRatingAC(id, reaction))
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
		await dispatch(setUserAC(data.data))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export type RequestComments = (id: number) => void
export const requestComments = (id: number) => async (dispatch: Dispatch) => {
	const data = await postAPI.getComments(id)
	await dispatch(setCommentsAC(data.data))
}

export type DeletePost = (id: number) => void
export const deletePost = (id: number) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.delete(id)
	if (data && data.status) {
		res = true
		await dispatch(deletePostAC(id))
		await dispatch(setCommentsAC(null))
	}
	await dispatch(setProgress(100))
	return res
}

export type SetPostToEdit = (post: TPost | null) => void
export const setPostToEdit = (post: TPost | null) => async (dispatch: Dispatch) => {
	dispatch(setPostToEditAC(post))
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
	await dispatch(setPostsAC(posts))
	await dispatch(setUserCommentsAC(commentsByPostId))
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
			await dispatch(deleteCommentAC(id))
		} else {
			await dispatch(deleteUserCommentAC(id, postID))
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
			await dispatch(editCommentAC(id, content))
		} else {
			await dispatch(editUserCommentAC(id, postID, content))
		}
	}
	await dispatch(setProgress(100))
	return res
}

export default postsReducer