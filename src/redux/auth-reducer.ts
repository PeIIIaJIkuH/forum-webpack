import {authAPI} from '../api/requests'
import {setProgress} from './app-reducer'
import {ThunkDispatch} from 'redux-thunk'
import {State} from './store'
import {TNotification} from '../types/types'

const SET_USER_DATA = 'auth/SET_USER_DATA',
	SET_NOTIFICATIONS = 'auth/SET_NOTIFICATIONS'

type InitialState = {
	id: number | null
	username: string | null
	email: string | null
	createdAt: number | null
	lastActive: number | null
	isAuth: boolean
	notifications: TNotification[] | null
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
	notifications: TNotification[] | null
}
const setNotificationsAC = (notifications: TNotification[] | null): SetNotificationsAC => ({
	type: SET_NOTIFICATIONS,
	notifications
})

type Dispatch = ThunkDispatch<State, unknown, Action>

export type RequestNotifications = () => void
export const requestNotifications = () => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await authAPI.getNotifications()
	if (data && data.status) {
		await dispatch(setNotificationsAC(data.data))
	}
}

export const requestAuthUserData = () => async (dispatch: Dispatch) => {
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

export type Signup = (username: string, email: string, password: string) => void
export const signup = (username: string, email: string, password: string) => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await authAPI.signup(username, email, password)
	if (data && data.status) {
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export type Signin = (username: string, password: string) => void
export const signin = (username: string, password: string) => async (dispatch: Dispatch) => {
	let res = false
	const data = await authAPI.signin(username, password)
	if (data && data.status) {
		await dispatch(requestAuthUserData())
		res = true
	}
	return res
}

export type Signout = () => void
export const signout = () => async (dispatch: Dispatch) => {
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

export type DeleteNotification = () => void
export const deleteNotification = () => async (dispatch: Dispatch) => {
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