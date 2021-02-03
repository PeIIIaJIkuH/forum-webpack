import {postAPI} from '../api/requests'

const SET_POSTS = 'posts/SET_POSTS'

const initialState = {
	posts: null
}

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_POSTS:
			return {...state, posts: [...action.payload]}
		default:
			return state
	}
}

const setPosts = (posts) => ({
	type: SET_POSTS,
	payload: posts
})

export const requestPosts = () => async dispatch => {
	const data = await postAPI.all()
	console.log(data)
}


export default postsReducer