import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getPostRating, groupBy, updateObjectInArray} from '../utils/helpers/helpers'
import {setProgress} from './app-reducer'
import history from '../history'
import {Category, Post, Comment, Reaction, User} from '../types/types'
import {ThunkAction} from 'redux-thunk'
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
	posts: Post[] | null
	user: User | null
	comments: Comment[] | null
	postToEdit: Post | null
	userComments: { [key: string]: Comment[] } | null
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
				comments: state.comments && state.comments.filter((comment: any) => comment.id !== action.id)
			}
		case SET_USER_COMMENTS:
			return {...state, userComments: action.comments}
		case DELETE_USER_COMMENT:
			const id = action.id,
				postID = action.postID,
				comments = {...state.userComments}
			const postComments = comments[postID].filter((comment: any) => comment.id !== id)
			comments[postID] = postComments
			return {...state, userComments: comments}
		case EDIT_COMMENT:
			if (state.comments) {
				const cComments = [...state.comments]
				const index = cComments && cComments.findIndex((comment: any) => comment.id === action.id)
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
	posts: Post[] | null
}
const setPostsAC = (posts: Post[] | null): SetPostsAC => ({
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
	user: User | null
}
const setUserAC = (user: User | null): SetUserAC => ({
	type: SET_USER,
	user
})

type SetCommentsAC = {
	type: typeof SET_COMMENTS
	comments: Comment[] | null
}
const setCommentsAC = (comments: Comment[] | null): SetCommentsAC => ({
	type: SET_COMMENTS,
	comments
})

type SetUserCommentsAC = {
	type: typeof SET_USER_COMMENTS
	comments: { [key: string]: Comment[] } | null
}
const setUserCommentsAC = (comments: any): SetUserCommentsAC => ({
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
	post: Post | null
}
const setPostToEditAC = (post: Post | null): SetPostToEditAC => ({
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

export const requestAllPosts = (): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await postAPI.all()
	await dispatch(setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export const requestUserPosts = (id: number): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await userAPI.getCreatedPosts(id)
	await dispatch(setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export const requestRatedPosts = (userID: number, reaction: Reaction): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await userAPI.getRatedPosts(userID, reaction)
	await dispatch(setPostsAC(data.data))
	await dispatch(setProgress(100))
}

export const requestPost = (id: number): ThunkBoolean => async dispatch => {
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

type Thunk = ThunkAction<Promise<void>, State, unknown, Action>
type ThunkBoolean = ThunkAction<Promise<boolean>, State, unknown, Action>

export const requestPostsByCategories = (categories: Category[]): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await postAPI.getByCategories(categories)
	await dispatch(setPostsAC(data.data))
	history.push('/by-categories')
	await dispatch(setProgress(100))
}

export const setRating = (id: number, reaction: Reaction): ThunkBoolean => async dispatch => {
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

export const requestUser = (id: number): ThunkBoolean => async dispatch => {
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

export const requestComments = (id: number): Thunk => async dispatch => {
	const data = await postAPI.getComments(id)
	await dispatch(setCommentsAC(data.data))
}

export const deletePost = (id: number): ThunkBoolean => async dispatch => {
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

export const setPostToEdit = (post: Post): Thunk => async dispatch => {
	dispatch(setPostToEditAC(post))
}

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
	await dispatch(setPostsAC(posts))
	await dispatch(setUserCommentsAC(commentsByPostId))
	await dispatch(setProgress(100))
}

export const deleteComment = (id: number, postID: number): ThunkBoolean => async dispatch => {
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

export const editComment = (id: number, authorID: number, postID: number, content: string, isUserPage: boolean): ThunkBoolean => async dispatch => {
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