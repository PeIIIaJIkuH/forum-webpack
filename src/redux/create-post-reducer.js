import {categoriesAPI} from '../api/requests'

const SET_CATEGORIES = 'create-post/SET_CATEGORIES'

const initialState = {
	categories: null
}

const createPostReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {...state, categories: [...action.payload]}
		default:
			return state
	}
}

const setCategories = (categories) => ({
	type: SET_CATEGORIES,
	payload: categories
})

export const requestCategories = () => async dispatch => {
	const data = await categoriesAPI.all()
	const arr = []
	if (data.data) {
		data.data.forEach(e => arr.push(e.name))
	}
	await dispatch(setCategories(arr))
}

export default createPostReducer