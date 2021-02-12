import {requestAuthUserData} from './auth-reducer'

const INITIALIZE_APP = 'app/INITIALIZE_APP',
	SET_PROGRESS = 'app/SET_PROGRESS',
	SET_URL_TO = 'app/SET_URL_TO'

const initialState = {
	initialized: false,
	progress: 0,
	urlTo: null
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE_APP:
			return {...state, initialized: true}
		case SET_PROGRESS:
			return {...state, progress: action.payload}
		case SET_URL_TO:
			return {...state, urlTo: action.payload}
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

export default appReducer