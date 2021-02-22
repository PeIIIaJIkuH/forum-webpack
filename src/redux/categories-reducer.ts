import {categoriesAPI} from '../api/requests'
import {ThunkDispatch} from 'redux-thunk'
import {State} from './store'
import {Category} from '../types/types'

const SET_CATEGORIES = 'categories/SET_CATEGORIES',
	SET_SELECTED_CATEGORIES = 'categories/SET_SELECTED_CATEGORIES'

type InitialState = {
	all: Category[] | null
	selected: string[] | null
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
	categories: string[] | null
}
const setSelectedCategoriesAC = (categories: string[] | null): SetSelectedCategoriesAC => ({
	type: SET_SELECTED_CATEGORIES,
	categories
})

type Dispatch = ThunkDispatch<State, unknown, Action>

export type RequestCategories = () => void
export const requestCategories = () => async (dispatch: Dispatch) => {
	const data = await categoriesAPI.all()
	const arr = data && data.data ? data.data : null
	await dispatch(setCategoriesAC(arr))
}

export type SetSelectedCategories = (categories: string[] | null) => void
export const setSelectedCategories = (categories: string[] | null) => async (dispatch: Dispatch) => {
	dispatch(setSelectedCategoriesAC(categories))
}

export default categoriesReducer