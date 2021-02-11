import {authAPI} from '../api/requests'
import {toast} from 'react-toastify'
import {toastOptions} from '../utils/helpers/helpers'
import {setProgress} from './app-reducer'

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

const setUserDataAC = (id, username, email, createdAt, lastActive, isAuth) => ({
	type: SET_USER_DATA,
	payload: {id, username, email, createdAt, lastActive, isAuth}
})

export const requestAuthUserData = () => async dispatch => {
	dispatch(setProgress(0))
	const data = await authAPI.me()
	if (data && data.status) {
		const {id, username, email, createdAt, lastActive} = data.data
		dispatch(setUserDataAC(id, username, email, createdAt, lastActive, true))
	} else {
		console.log('User is not signed in.')
	}
	dispatch(setProgress(100))
}

export const signup = (username, email, password) => async dispatch => {
	let res = false
	dispatch(setProgress(0))
	const data = await authAPI.signup(username, email, password)
	if (data && data.status) {
		toast.success('Successfully created new user!', toastOptions)
		res = true
	} else {
		toast.error('Can not register, some error happened!', toastOptions)
	}
	dispatch(setProgress(100))
	return res
}

export const signin = (username, password) => async dispatch => {
	const data = await authAPI.signin(username, password)
	if (data && data.status) {
		await dispatch(requestAuthUserData())
		return true
	}
	toast.error('Can not log in, some error happened!', toastOptions)
	return false
}

export const signout = () => async dispatch => {
	dispatch(setProgress(0))
	const data = await authAPI.signout()
	if (data && data.status) {
		await dispatch(setUserDataAC(null, null, null, null, null, false))
	}
	dispatch(setProgress(100))
}

export default authReducer