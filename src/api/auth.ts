import {ApiPromise} from '../types'
import {defaultAxios} from './index'

const me = (): ApiPromise => defaultAxios.get('auth/me')

const signUp = (username: string, email: string, password: string, adminAuthToken: string): ApiPromise => defaultAxios.post('auth/signup', {
	username, email, password, adminAuthToken,
})

const signIn = (username: string, password: string): ApiPromise => defaultAxios.post('auth/signin', {
	username, password,
})

const signOut = (): ApiPromise => defaultAxios.get('auth/signout')

export const authAPI = {
	me,
	signUp,
	signIn,
	signOut,
}
