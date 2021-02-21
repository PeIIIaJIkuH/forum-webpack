import {authAPI} from '../api/requests'
import {setProgress} from './app-reducer'
import {ThunkAction} from 'redux-thunk'
import {State} from './store'

const SET_USER_DATA = 'auth/SET_USER_DATA',
	SET_NOTIFICATIONS = 'auth/SET_NOTIFICATIONS'

type InitialState = {
	id: number | null
	username: string | null
	email: string | null
	createdAt: number | null
	lastActive: number | null
	isAuth: boolean
	notifications: any
}
const initialState: InitialState = {
	id: null,
	username: null,
	email: null,
	createdAt: null,
	lastActive: null,
	isAuth: false,
	notifications: null
}

type Action = SetUserDataAC | SetNotificationsAC

const authReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state, id: action.id, username: action.username, email: action.email, createdAt: action.createdAt,
				lastActive: action.lastActive, isAuth: action.isAuth
			}
		case SET_NOTIFICATIONS:
			return {...state, notifications: action.notifications}
		default:
			return state
	}
}

type SetUserDataAC = {
	type: typeof SET_USER_DATA
	id: number | null
	username: string | null
	email: string | null
	createdAt: number | null
	lastActive: number | null
	isAuth: boolean
}
const setUserDataAC = (id: number | null, username: string | null, email: string | null, createdAt: number | null,
					   lastActive: number | null, isAuth: boolean): SetUserDataAC => ({
	type: SET_USER_DATA,
	id, username, email, createdAt, lastActive, isAuth
})

type SetNotificationsAC = {
	type: typeof SET_NOTIFICATIONS
	notifications: any
}
const setNotificationsAC = (notifications: any): SetNotificationsAC => ({
	type: SET_NOTIFICATIONS,
	notifications
})

type Thunk = ThunkAction<Promise<void>, State, unknown, Action>
type ThunkBoolean = ThunkAction<Promise<boolean>, State, unknown, Action>

export const requestNotifications = (): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await authAPI.getNotifications()
	if (data && data.status) {
		await dispatch(setNotificationsAC(data.data))
	}
}

export const requestAuthUserData = (): Thunk => async dispatch => {
	await dispatch(setProgress(0))
	const data = await authAPI.me()
	if (data && data.status) {
		const {id, username, email, createdAt, lastActive} = data.data
		dispatch(setUserDataAC(id, username, email, createdAt, lastActive, true))
		requestNotifications()
	} else {
		console.log('User is not signed in.')
	}
	await dispatch(setProgress(100))
}

export const signup = (username: string, email: string, password: string): ThunkBoolean => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await authAPI.signup(username, email, password)
	if (data && data.status) {
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export const signin = (username: string, password: string): ThunkBoolean => async dispatch => {
	let res = false
	const data = await authAPI.signin(username, password)
	if (data && data.status) {
		await dispatch(requestAuthUserData())
		res = true
	}
	return res
}

export const signout = (): ThunkBoolean => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await authAPI.signout()
	if (data && data.status) {
		await dispatch(setUserDataAC(null, null, null, null, null, false))
		await dispatch(setNotificationsAC(null))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export const deleteNotification = (): ThunkBoolean => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await authAPI.deleteNotification()
	if (data && data.status) {
		res = true
		await dispatch(setNotificationsAC(null))
	}
	await dispatch(setProgress(100))
	return res
}

export default authReducer