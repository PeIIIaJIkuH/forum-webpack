import {EUserRole, IUser} from '../types'
import {makeAutoObservable} from 'mobx'
import appState from './appState'
import {authAPI} from '../api/auth'
import userState from './userState'

class AuthState {
	user: IUser | null = null
	role = EUserRole.guest

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setRole(role: EUserRole) {
		this.role = role
	}

	async fetchUserData() {
		appState.setProgress(0)
		const {data, status} = await authAPI.me()
		appState.setProgress(100)
		if (status) {
			const {id, username, email, createdAt, lastActive, role} = data
			this.setUser({id, username, email, createdAt, lastActive})
			this.setRole(role)
		}
	}

	async signUp(username: string, email: string, password: string, adminToken: string) {
		appState.setProgress(0)
		const {status} = await authAPI.signUp(username, email, password, adminToken)
		appState.setProgress(100)
		return status
	}

	async signIn(username: string, password: string) {
		appState.setProgress(0)
		const {status} = await authAPI.signIn(username, password)
		if (status) {
			await this.fetchUserData()
		}
		appState.setProgress(100)
		return status
	}

	async signOut() {
		appState.setProgress(0)
		const {status} = await authAPI.signOut()
		appState.setProgress(100)
		if (status) {
			this.setUser(null)
			this.setRole(EUserRole.guest)
			userState.setNotifications([])
		}
		return status
	}
}

export default new AuthState()
