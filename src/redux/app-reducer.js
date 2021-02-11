import {requestAuthUserData} from './auth-reducer'

const INITIALIZE_APP = 'app/INITIALIZE_APP',
	SET_PROGRESS = 'app/SET_PROGRESS'

const initialState = {
	initialized: false,
	progress: 0
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE_APP:
			return {...state, initialized: true}
		case SET_PROGRESS:
			return {...state, progress: action.payload}
		default:
			return state
	}
}

const initializeAppAC = () => ({type: INITIALIZE_APP})

const setProgressAC = progress => ({
	type: SET_PROGRESS,
	payload: progress
})

export const initializeApp = () => async dispatch => {
	await dispatch(requestAuthUserData())
	await dispatch(initializeAppAC())
}

export const setProgress = progress => async dispatch => {
	await dispatch(setProgressAC(progress))
}

export default appReducer