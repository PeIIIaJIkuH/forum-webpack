import {requestAuthUserData} from './auth-reducer'
import {ActionTypes, ThunkType} from './store'

type InitialState = {
	initialized: boolean
	progress: number
	urlTo: string | null
	menuOpen: boolean
}
const initialState: InitialState = {
	initialized: false,
	progress: 0,
	urlTo: null,
	menuOpen: false
}

type Action = ActionTypes<typeof appActions>

export const appReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'app/INITIALIZE_APP':
			return {...state, initialized: true}
		case 'app/SET_PROGRESS':
			return {...state, progress: action.progress}
		case 'app/SET_URL_TO':
			return {...state, urlTo: action.urlTo}
		case 'app/SET_MENU_OPEN':
			return {...state, menuOpen: action.menuOpen}
		default:
			return state
	}
}

export const appActions = {
	initializeAppAC: () => ({
		type: 'app/INITIALIZE_APP'
	} as const),
	setProgressAC: (progress: number) => ({
		type: 'app/SET_PROGRESS',
		progress
	} as const),
	setUrlToAC: (urlTo: string | null) => ({
		type: 'app/SET_URL_TO',
		urlTo
	} as const),
	setMenuOpenAC: (menuOpen: boolean) => ({
		type: 'app/SET_MENU_OPEN',
		menuOpen
	} as const)
}

type Thunk = ThunkType<void, Action>

export const initializeApp = (): Thunk => async dispatch => {
	await dispatch(requestAuthUserData())
	await dispatch(appActions.initializeAppAC())
}

export type SetProgress = (progress: number) => void
export const setProgress = (progress: number): Thunk => async dispatch => {
	await dispatch(appActions.setProgressAC(progress))
}

export const setUrlTo = (url: string | null): Thunk => async dispatch => {
	await dispatch(appActions.setUrlToAC(url))
}

export const setMenuOpen = (menuOpen: boolean): Thunk => async dispatch => {
	if (!menuOpen) document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
	else document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
	await dispatch(appActions.setMenuOpenAC(menuOpen))
}