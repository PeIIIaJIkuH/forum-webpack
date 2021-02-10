import {authAPI} from '../api/requests'
import {toast} from 'react-toastify'
import {toastOptions} from '../utils/helpers/helpers'

const SET_USER_DATA = 'auth/SET_USER_DATA'

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
		case SET_USER_DATA:
			return {...state, ...action.payload}
		default:
			return state
	}
}

export const setAuthUserData = (id, username, email, createdAt, lastActive, isAuth) => ({
	type: SET_USER_DATA,
	payload: {id, username, email, createdAt, lastActive, isAuth}
})

export const getAuthUserData = () => async dispatch => {
	const data = await authAPI.me()
	if (data && data.status) {
		const {id, username, email, createdAt, lastActive} = data.data
		dispatch(setAuthUserData(id, username, email, createdAt, lastActive, true))
	} else {
		console.log('User is not signed in.')
	}
}

export const signup = (username, email, password) => async dispatch => {
	const data = await authAPI.signup(username, email, password)
	if (data && data.status) {
		toast.success('Successfully created new user!', toastOptions)
	} else {
		toast.error('Username or E-mail already exists!', toastOptions)
	}
}

export const signin = (username, password) => async dispatch => {
	const data = await authAPI.signin(username, password)
	if (data && data.status) {
		await dispatch(getAuthUserData())
	} else {
		toast.error('Can not log in, some error happened!', toastOptions)
	}
}

export const signout = () => async dispatch => {
	const data = await authAPI.signout()
	if (data && data.status) {
		dispatch(setAuthUserData(null, null, null, null, null, false))
	}
}

export default authReducer