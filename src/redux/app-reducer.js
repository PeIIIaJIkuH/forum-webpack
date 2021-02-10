import {requestAuthUserData} from './auth-reducer'

const INITIALIZE_APP = 'app/INITIALIZE_APP'

const initialState = {
	initialized: false
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE_APP:
			return {...state, initialized: true}
		default:
			return state
	}
}

const initializeAppAC = () => ({type: INITIALIZE_APP})

export const initializeApp = () => async dispatch => {
	await dispatch(requestAuthUserData())
	await dispatch(initializeAppAC())
}

export default appReducer