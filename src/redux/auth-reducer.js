import {authAPI} from '../api/requests'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

const initialState = {
	id: null,
	username: null,
	email: null,
	createdAt: null,
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

export const setAuthUserData = (id, username, email, createdAt, lastActive, isAuth) => ({
	type: SET_AUTH_USER_DATA,
	payload: {id, username, email, createdAt, lastActive, isAuth}
})

export const getAuthUserData = () => async dispatch => {
	const data = await authAPI.me()
	if (data && data.status) {
		const {id, username, email, createdAt, lastActive} = data.data
		dispatch(setAuthUserData(id, username, email, createdAt, lastActive, true))
	}
}

export const signup = (username, email, password) => async dispatch => {
	const data = await authAPI.signup(username, email, password)
	if (data.status) {
		console.log('Successful!')
	} else {
		console.log('Error!')
	}
}

export const signin = (username, password) => async dispatch => {
	const data = await authAPI.signin(username, password)
	if (data.status) {
		await dispatch(getAuthUserData())
	} else {
		console.log('Error!')
	}
}

export const signout = () => async dispatch => {
	const data = await authAPI.signout()
	if (data.status) {
		dispatch(setAuthUserData(null, null, null, null, null, false))
	}
}

export default authReducer