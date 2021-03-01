import {authAPI} from '../api/requests'
import {setProgress} from './app-reducer'
import {ThunkDispatch} from 'redux-thunk'
import {ActionTypes, State} from './store'
import {TNotification} from '../types/types'

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

type Action = ActionTypes<typeof authActions>

export const authReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return {
				...state, id: action.id, username: action.username, email: action.email, createdAt: action.createdAt,
				lastActive: action.lastActive, isAuth: action.isAuth
			}
		case 'auth/SET_NOTIFICATIONS':
			return {...state, notifications: action.notifications}
		default:
			return state
	}
}

export const authActions = {
	setUserDataAC: (id: number | null, username: string | null, email: string | null, createdAt: number | null,
					lastActive: number | null, isAuth: boolean) => ({
		type: 'auth/SET_USER_DATA',
		id, username, email, createdAt, lastActive, isAuth
	} as const),
	setNotificationsAC: (notifications: TNotification[] | null) => ({
		type: 'auth/SET_NOTIFICATIONS',
		notifications
	} as const)
}

type Dispatch = ThunkDispatch<State, unknown, Action>

export const requestAuthUserData = () => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await authAPI.me()
	if (data && data.status) {
		const {id, username, email, createdAt, lastActive} = data.data
		dispatch(authActions.setUserDataAC(id, username, email, createdAt, lastActive, true))
		requestNotifications()
	}
	await dispatch(setProgress(100))
}

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
		await dispatch(authActions.setUserDataAC(null, null, null, null, null, false))
		await dispatch(authActions.setNotificationsAC(null))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}

export const requestNotifications = () => async (dispatch: Dispatch) => {
	await dispatch(setProgress(0))
	const data = await authAPI.getNotifications()
	if (data && data.status) {
		await dispatch(authActions.setNotificationsAC(data.data))
	}
	await dispatch(setProgress(100))
}

export type DeleteNotification = () => void
export const deleteNotification = () => async (dispatch: Dispatch) => {
	let res = false
	await dispatch(setProgress(0))
	const data = await authAPI.deleteNotification()
	if (data && data.status) {
		res = true
		await dispatch(authActions.setNotificationsAC(null))
	}
	await dispatch(setProgress(100))
	return res
}