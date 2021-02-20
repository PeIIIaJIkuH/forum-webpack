import {categoriesAPI} from '../api/requests'
import {setProgress} from './app-reducer'

const SET_CATEGORIES = 'categories/SET_CATEGORIES',
	SET_SELECTED_CATEGORIES = 'categories/SET_SELECTED_CATEGORIES'

const initialState = {
	data: null,
	selected: null
}

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {...state, data: action.payload}
		case SET_SELECTED_CATEGORIES:
			return {...state, selected: action.payload}
		default:
			return state
	}
}

const setCategoriesAC = categories => ({
	type: SET_CATEGORIES,
	payload: categories
})

const setSelectedCategoriesAC = categories => ({
	type: SET_SELECTED_CATEGORIES,
	payload: categories
})

export const requestCategories = () => async dispatch => {
	const data = await categoriesAPI.all()
	const arr = data && data.data ? data.data.map(e => e.name) : null
	await dispatch(setCategoriesAC(arr))
}

export const setSelectedCategories = categories => async dispatch => {
	dispatch(setSelectedCategoriesAC(categories))
}

export default categoriesReducer