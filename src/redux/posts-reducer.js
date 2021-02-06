import {postAPI, userAPI} from '../api/requests'
import {getObjectInArray, getPostRating, updateObjectInArray} from '../utils/helpers/helpers'

const SET_POSTS = 'posts/SET_POSTS',
	SET_RATING = 'posts/SET_RATING',
	SET_USER = 'posts/SET_USER',
	SET_COMMENTS = 'posts/SET_COMMENTS'

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
		default:
			return state
	}
}

const setPosts = (posts, allowNull) => ({
	type: SET_POSTS,
	payload: {posts, allowNull}
})

export const requestPosts = () => async dispatch => {
	const data = await postAPI.all()
	await dispatch(setPosts(data.data, false))
}

const setRatingAC = (id, reaction) => ({
	type: SET_RATING,
	payload: {id, reaction}
})

export const setRating = (id, reaction) => async dispatch => {
	await postAPI.rate(id, reaction)
	await dispatch(setRatingAC(id, reaction))
}

const setUser = user => ({
	type: SET_USER,
	payload: user
})

export const requestUser = id => async dispatch => {
	const data = await userAPI.get(id)
	await dispatch(setUser(data.data))
}

export const requestUserPosts = id => async dispatch => {
	const data = await userAPI.getCreatedPosts(+id)
	await dispatch(setPosts(data.data, false))
}

export const requestRatedPosts = reaction => async dispatch => {
	const data = await userAPI.getRatedPosts(reaction)
	await dispatch(setPosts(data.data, false))
}

export const requestPost = id => async dispatch => {
	const data = await postAPI.get(id)
	await dispatch(setPosts([data.data], false))
}

export const requestPostsByCategories = categories => async dispatch => {
	if (categories) {
		const data = await postAPI.getByCategories(categories)
		await dispatch(setPosts(data.data, true))
	}
}

const setComments = comments => ({
	type: SET_COMMENTS,
	payload: comments
})

export const requestComments = id => async dispatch => {
	const data = await postAPI.getComments(id)
	await dispatch(setComments(data.data))
}

export default postsReducer