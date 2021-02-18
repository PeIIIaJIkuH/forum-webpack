import {requestAuthUserData} from './auth-reducer'

const INITIALIZE_APP = 'app/INITIALIZE_APP',
	SET_PROGRESS = 'app/SET_PROGRESS',
	SET_URL_TO = 'app/SET_URL_TO',
	SET_MENU_OPEN = 'app/SET_MENU_OPEN'

const initialState = {
	initialized: false,
	progress: 0,
	urlTo: null,
	menuOpen: false
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE_APP:
			return {...state, initialized: true}
		case SET_PROGRESS:
			return {...state, progress: action.payload}
		case SET_URL_TO:
			return {...state, urlTo: action.payload}
		case SET_MENU_OPEN:
			return {...state, menuOpen: action.payload}
		default:
			return state
	}
}

const initializeAppAC = () => ({type: INITIALIZE_APP})

const setProgressAC = progress => ({
	type: SET_PROGRESS,
	payload: progress
})

const setUrlToAC = url => ({
	type: SET_URL_TO,
	payload: url
})

const setMenuOpenAC = menuOpen => ({
	type: SET_MENU_OPEN,
	payload: menuOpen
})

export const initializeApp = () => async dispatch => {
	await dispatch(requestAuthUserData())
	await dispatch(initializeAppAC())
}

export const setProgress = progress => async dispatch => {
	await dispatch(setProgressAC(progress))
}

export const setUrlTo = url => async dispatch => {
	await dispatch(setUrlToAC(url))
}

export const setMenuOpen = menuOpen => async dispatch => {
	if (!menuOpen) document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
	else document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
	await dispatch(setMenuOpenAC(menuOpen))
}

export default appReducer