import {userAPI} from '../api/requests'
import {setProgress} from './app-reducer'
import {TUser} from '../types/types'
import {ActionTypes, ThunkType} from './store'

type InitialState = {
	user: TUser | null
}
const initialState: InitialState = {
	user: null
}

type Action = ActionTypes<typeof userActions>

export const userReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'posts/SET_USER':
			return {...state, user: action.user}
		default:
			return state
	}
}

const userActions = {
	setUserAC: (user: TUser | null) => ({
		type: 'posts/SET_USER',
		user
	} as const)
}

type ThunkBool = ThunkType<boolean, Action>


export type RequestUser = (id: number) => void
export const requestUser = (id: number): ThunkBool => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await userAPI.get(id)
	if (data.data) {
		await dispatch(userActions.setUserAC(data.data))
		res = true
	}
	await dispatch(setProgress(100))
	return res
}
