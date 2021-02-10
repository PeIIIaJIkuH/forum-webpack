import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getPostRating, toastOptions, updateObjectInArray} from '../utils/helpers/helpers'
import history from '../history'
import {toast} from 'react-toastify'

const SET_POSTS = 'posts/SET_POSTS',
	SET_RATING = 'posts/SET_RATING',
	SET_USER = 'posts/SET_USER',
	SET_COMMENTS = 'posts/SET_COMMENTS',
	DELETE_POST = 'posts/DELETE_POST'

const initialState = {
	posts: null,
	user: null,
	comments: null
}

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_POSTS:
			if (!action.payload.posts && action.payload.allowNull) return {...state, posts: null}
			return {...state, posts: action.payload.posts ? [...action.payload.posts] : null}
		case SET_RATING:
			const post = getObjectInArray(state.posts, action.payload.id, 'id')
			const [userRating, postRating] = getPostRating(post.userRating, post.postRating, action.payload.reaction)
			return {
				...state,
				posts: updateObjectInArray(state.posts, action.payload.id, 'id',
					{postRating, userRating})
			}
		case SET_USER:
			return {...state, user: {...action.payload}}
		case SET_COMMENTS:
			return {...state, comments: action.payload === null ? null : [...action.payload]}
		case DELETE_POST:
			return {...state, posts: state.posts.filter(post => post.id !== action.payload)}
		default:
			return state
	}
}

const setPostsAC = (posts, allowNull) => ({
	type: SET_POSTS,
	payload: {posts, allowNull}
})

const setRatingAC = (id, reaction) => ({
	type: SET_RATING,
	payload: {id, reaction}
})

const setUserAC = user => ({
	type: SET_USER,
	payload: user
})

const setCommentsAC = comments => ({
	type: SET_COMMENTS,
	payload: comments
})

const deletePostAC = postID => ({
	type: DELETE_POST,
	payload: postID
})

export const requestAllPosts = () => async dispatch => {
	const data = await postAPI.all()
	await dispatch(setPostsAC(data.data, false))
}

export const requestUserPosts = id => async dispatch => {
	const data = await userAPI.getCreatedPosts(id)
	await dispatch(setPostsAC(data.data, false))
}

export const requestRatedPosts = reaction => async dispatch => {
	const data = await userAPI.getRatedPosts(reaction)
	await dispatch(setPostsAC(data.data, false))
}

export const requestPost = id => async dispatch => {
	const data = await postAPI.get(id)
	await dispatch(setPostsAC([data.data], false))
}

export const requestPostsByCategories = categories => async dispatch => {
	if (categories) {
		const data = await postAPI.getByCategories(categories)
		await dispatch(setPostsAC(data.data, true))
		history.push('/by-categories')
	}
}

export const setRating = (id, reaction) => async dispatch => {
	await postAPI.rate(id, reaction)
	await dispatch(setRatingAC(id, reaction))
}

export const requestUser = id => async dispatch => {
	const data = await userAPI.get(id)
	await dispatch(setUserAC(data.data))
}

export const requestComments = id => async dispatch => {
	const data = await postAPI.getComments(id)
	await dispatch(setCommentsAC(data.data))
}

export const deletePost = id => async dispatch => {
	const data = postAPI.delete(id)
	if (data && data.status) {
		await dispatch(deletePostAC(id))
	} else {
		toast.warning('Could not delete this post.', toastOptions)
	}
}

export default postsReducer