import {requestAuthUserData} from './auth-reducer'
import {State} from './store'
import {ThunkAction} from 'redux-thunk'

const INITIALIZE_APP = 'app/INITIALIZE_APP',
	SET_PROGRESS = 'app/SET_PROGRESS',
	SET_URL_TO = 'app/SET_URL_TO',
	SET_MENU_OPEN = 'app/SET_MENU_OPEN'

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

type Action = InitializeAppAC | SetProgressAC | SetUrlToAC | SetMenuOpenAC
const appReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case INITIALIZE_APP:
			return {...state, initialized: true}
		case SET_PROGRESS:
			return {...state, progress: action.progress}
		case SET_URL_TO:
			return {...state, urlTo: action.url}
		case SET_MENU_OPEN:
			return {...state, menuOpen: action.menuOpen}
		default:
			return state
	}
}

type InitializeAppAC = {
	type: typeof INITIALIZE_APP
}
const initializeAppAC = (): InitializeAppAC => ({
	type: INITIALIZE_APP
})

type SetProgressAC = {
	type: typeof SET_PROGRESS
	progress: number
}
const setProgressAC = (progress: number): SetProgressAC => ({
	type: SET_PROGRESS,
	progress
})

type SetUrlToAC = {
	type: typeof SET_URL_TO
	url: string
}
const setUrlToAC = (url: string): SetUrlToAC => ({
	type: SET_URL_TO,
	url
})

type SetMenuOpenAC = {
	type: typeof SET_MENU_OPEN
	menuOpen: boolean
}
const setMenuOpenAC = (menuOpen: boolean): SetMenuOpenAC => ({
	type: SET_MENU_OPEN,
	menuOpen
})

type Thunk = ThunkAction<Promise<void>, State, unknown, Action>

export const initializeApp = (): Thunk => async dispatch => {
	await dispatch(requestAuthUserData())
	await dispatch(initializeAppAC())
}

export const setProgress = (progress: number): Thunk => async dispatch => {
	await dispatch(setProgressAC(progress))
}

export const setUrlTo = (url: string): Thunk => async dispatch => {
	await dispatch(setUrlToAC(url))
}

export const setMenuOpen = (menuOpen: boolean): Thunk => async dispatch => {
	if (!menuOpen) document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
	else document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
	await dispatch(setMenuOpenAC(menuOpen))
}

export default appReducer