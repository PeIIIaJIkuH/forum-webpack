import {getAuthUserData} from './auth-reducer'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

const initialState = {
	initialized: false
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {...state, initialized: true}
		default:
			return state
	}
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => async dispatch => {
	await dispatch(getAuthUserData())
	await dispatch(initializedSuccess())
}

export default appReducer