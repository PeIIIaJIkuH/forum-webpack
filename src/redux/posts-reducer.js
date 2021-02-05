import {postAPI} from '../api/requests'
import {getObjectInArray, updateObjectInArray} from '../utils/helpers/helpers'

const SET_POSTS = 'posts/SET_POSTS',
	SET_RATING = 'posts/SET_RATING'

const initialState = {
	posts: null
}

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_POSTS:
			if (!action.payload) return state
			return {...state, posts: [...action.payload]}
		case SET_RATING:
			const post = getObjectInArray(state.posts, action.payload.id, 'id')
			let userRating = post.userRating,
				postRating = post.postRating,
				reaction = action.payload.reaction

			if (userRating !== 0) {
				if (userRating === reaction) {
					userRating = 0
					postRating -= reaction
				} else {
					userRating *= -1
					postRating += 2 * userRating
				}
			} else {
				userRating = reaction
				postRating += reaction
			}

			return {
				...state,
				posts: updateObjectInArray(state.posts, action.payload.id, 'id',
					{postRating, userRating})
			}
		default:
			return state
	}
}

const setPosts = posts => ({
	type: SET_POSTS,
	payload: posts
})

export const requestPosts = () => async dispatch => {
	const data = await postAPI.all()
	await dispatch(setPosts(data.data))
}

const setRatingAC = (id, reaction) => ({
	type: SET_RATING,
	payload: {id, reaction}
})

export const setRating = (id, reaction) => async dispatch => {
	await postAPI.rate(id, reaction)
	await dispatch(setRatingAC(id, reaction))
}

export default postsReducer