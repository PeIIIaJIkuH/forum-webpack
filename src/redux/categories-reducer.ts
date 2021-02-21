import {categoriesAPI} from '../api/requests'
import {Category} from '../types/types'
import {ThunkAction} from 'redux-thunk'
import {State} from './store'

const SET_CATEGORIES = 'categories/SET_CATEGORIES',
	SET_SELECTED_CATEGORIES = 'categories/SET_SELECTED_CATEGORIES'

type InitialState = {
	all: Category[] | null
	selected: Category[] | null
}
const initialState: InitialState = {
	all: null,
	selected: null
}

type Action = SetCategoriesAC | SetSelectedCategoriesAC

const categoriesReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {...state, all: action.categories}
		case SET_SELECTED_CATEGORIES:
			return {...state, selected: action.categories}
		default:
			return state
	}
}

type SetCategoriesAC = {
	type: typeof SET_CATEGORIES
	categories: Category[] | null
}
const setCategoriesAC = (categories: Category[] | null): SetCategoriesAC => ({
	type: SET_CATEGORIES,
	categories
})

type SetSelectedCategoriesAC = {
	type: typeof SET_SELECTED_CATEGORIES
	categories: Category[] | null
}
const setSelectedCategoriesAC = (categories: Category[] | null): SetSelectedCategoriesAC => ({
	type: SET_SELECTED_CATEGORIES,
	categories
})

type Thunk = ThunkAction<Promise<void>, State, unknown, Action>

export const requestCategories = (): Thunk => async dispatch => {
	const data = await categoriesAPI.all()
	const arr = data && data.data ? data.data.map((category: Category) => category.name) : null
	await dispatch(setCategoriesAC(arr))
}

export const setSelectedCategories = (categories: Category[] | null): Thunk => async dispatch => {
	dispatch(setSelectedCategoriesAC(categories))
}

export default categoriesReducer