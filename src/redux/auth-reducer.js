import {authAPI} from '../api/requests'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

const initialState = {
	username: null,
	email: null,
	signupTime: null,
	lastActive: null,
	isAuth: false
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_USER_DATA:
			return {...state, ...action.payload}
		default:
			return state
	}
}

export const setAuthUserData = (username, email, signupTime, lastActive, isAuth) => ({
	type: SET_AUTH_USER_DATA,
	payload: {username, email, signupTime, lastActive, isAuth}
})

export const getAuthUserData = () => async dispatch => {
	const data = await authAPI.me()
	if (data && data.status) {
		const {username, email, signupTime, lastActive} = data
		dispatch(setAuthUserData(username, email, signupTime, lastActive, true))
	}
}

export const signup = (username, email, password) => async dispatch => {
	const data = await authAPI.signup(username, email, password)
	if (data.status) {
		dispatch(getAuthUserData())
	} else {
		console.log('Error!')
	}
}

export const signin = (username, password) => async dispatch => {
	const data = await authAPI.signin(username, password)
	console.log(data)
	if (data.status) {
		dispatch(getAuthUserData())
	} else {
		console.log('Error!')
	}
}

export const signout = () => async dispatch => {
	const data = await authAPI.signout()
	console.log(data)
	if (data.status) {
		dispatch(setAuthUserData(null, null, null, null, false))
	}
}

export default authReducer