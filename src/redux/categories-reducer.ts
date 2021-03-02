import {categoriesAPI} from '../api/requests'
import {ActionTypes, ThunkType} from './store'
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

type Thunk = ThunkType<void, Action>

export type RequestCategories = () => void
export const requestCategories = (): Thunk => async dispatch => {
	const data = await categoriesAPI.all()
	const arr = data && data.data ? data.data : null
	await dispatch(categoriesActions.setCategoriesAC(arr))
}

export const setSelectedCategories = (categories: string[] | null): Thunk => async dispatch => {
	dispatch(categoriesActions.setSelectedCategoriesAC(categories))
}
