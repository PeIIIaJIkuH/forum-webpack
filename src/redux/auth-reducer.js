import {authAPI} from '../api/requests'
import {setProgress} from './app-reducer'

const SET_USER_DATA = 'auth/SET_USER_DATA',
	SET_NOTIFICATIONS = 'auth/SET_NOTIFICATIONS'

const initialState = {
	id: null,
	username: null,
	email: null,
	createdAt: null,
	lastActive: null,
	isAuth: false,
	notifications: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {...state, ...action.payload}
		case SET_NOTIFICATIONS:
			return {...state, notifications: action.payload}
		default:
			return state
	}
}

const setUserDataAC = (id, username, email, createdAt, lastActive, isAuth) => ({
	type: SET_USER_DATA,
	payload: {id, username, email, createdAt, lastActive, isAuth}
})

const setNotificationsAC = notifications => ({
	type: SET_NOTIFICATIONS,
	payload: notifications
})

export const requestNotifications = () => async dispatch => {
	dispatch(setProgress(0))
	const data = await authAPI.getNotifications()
	if (data && data.status) {
		await dispatch(setNotificationsAC(data.data))
	}
	dispatch(setProgress(100))
}

export const requestAuthUserData = () => async dispatch => {
	dispatch(setProgress(0))
	const data = await authAPI.me()
	if (data && data.status) {
		const {id, username, email, createdAt, lastActive} = data.data
		dispatch(setUserDataAC(id, username, email, createdAt, lastActive, true))
		dispatch(requestNotifications())
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
		res = true
	}
	dispatch(setProgress(100))
	return res
}

export const signin = (username, password) => async dispatch => {
	let res = false
	const data = await authAPI.signin(username, password)
	if (data && data.status) {
		await dispatch(requestAuthUserData())
		res = true
	}
	return res
}

export const signout = () => async dispatch => {
	let res = false
	dispatch(setProgress(0))
	const data = await authAPI.signout()
	if (data && data.status) {
		await dispatch(setUserDataAC(null, null, null, null, null, false))
		await dispatch(setNotificationsAC(null))
		res = true
	}
	dispatch(setProgress(100))
	return res
}

export const deleteNotification = () => async dispatch => {
	let res = false
	dispatch(setProgress(0))
	const data = await authAPI.deleteNotification()
	if (data && data.status) {
		res = true
		await dispatch(setNotificationsAC(null))
	}
	dispatch(setProgress(100))
	return res
}

export default authReducer