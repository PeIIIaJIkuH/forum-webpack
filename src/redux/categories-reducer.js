import {categoriesAPI} from '../api/requests'

const SET_CATEGORIES = 'categories/SET_CATEGORIES'

const initialState = {
	data: null
}

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {...state, data: [...action.payload]}
		default:
			return state
	}
}

const setCategories = data => ({
	type: SET_CATEGORIES,
	payload: data
})

export const requestCategories = () => async dispatch => {
	const data = await categoriesAPI.all()
	const arr = []
	if (data.data) {
		data.data.forEach(e => arr.push(e.name))
	}
	await dispatch(setCategories(arr))
}

export default categoriesReducer