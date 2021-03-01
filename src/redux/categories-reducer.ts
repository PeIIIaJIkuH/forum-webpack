import {categoriesAPI} from '../api/requests'
import {ThunkDispatch} from 'redux-thunk'
import {ActionTypes, State} from './store'
import {Category} from '../types/types'

type InitialState = {
	all: Category[] | null
	selected: string[] | null
}
const initialState: InitialState = {
	all: null,
	selected: null
}

type Action = ActionTypes<typeof categoriesActions>

export const categoriesReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'categories/SET_CATEGORIES':
			return {...state, all: action.categories}
		case 'categories/SET_SELECTED_CATEGORIES':
			return {...state, selected: action.categories}
		default:
			return state
	}
}

const categoriesActions = {
	setCategoriesAC: (categories: Category[] | null) => ({
		type: 'categories/SET_CATEGORIES',
		categories
	} as const),
	setSelectedCategoriesAC: (categories: string[] | null) => ({
		type: 'categories/SET_SELECTED_CATEGORIES',
		categories
	} as const)
}

type Dispatch = ThunkDispatch<State, unknown, Action>

export type RequestCategories = () => void
export const requestCategories = () => async (dispatch: Dispatch) => {
	const data = await categoriesAPI.all()
	const arr = data && data.data ? data.data : null
	await dispatch(categoriesActions.setCategoriesAC(arr))
}

export type SetSelectedCategories = (categories: string[] | null) => void
export const setSelectedCategories = (categories: string[] | null) => async (dispatch: Dispatch) => {
	dispatch(categoriesActions.setSelectedCategoriesAC(categories))
}
