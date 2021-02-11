import {categoriesAPI} from '../api/requests'
import {setProgress} from './app-reducer'

const SET_CATEGORIES = 'categories/SET_CATEGORIES'

const initialState = {
	data: null
}

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {...state, data: action.payload}
		default:
			return state
	}
}

const setCategories = data => ({
	type: SET_CATEGORIES,
	payload: data
})

export const requestCategories = () => async dispatch => {
	dispatch(setProgress(0))
	const data = await categoriesAPI.all()
	const arr = data && data.data ? data.data.map(e => e.name) : null
	await dispatch(setCategories(arr))
	dispatch(setProgress(100))
}

export default categoriesReducer