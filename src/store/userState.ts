import {makeAutoObservable} from 'mobx'
import {INotification, IUser} from '../types'
import appState from './appState'
import {userAPI} from '../api/user'

class UserState {
	user: IUser | null = null
	notifications: INotification[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setNotifications(notifications: INotification[] | null) {
		this.notifications = notifications || []
	}

	async fetchUser(userId: number) {
		appState.setProgress(0)
		const {data, status} = await userAPI.fetchUser(userId)
		appState.setProgress(100)
		if (status) {
			this.setUser(data)
		}
		return status
	}

	async fetchNotifications() {
		appState.setProgress(0)
		const {data, status} = await userAPI.fetchNotifications()
		appState.setProgress(100)
		if (status) {
			this.setNotifications(data)
		}
	}

	async clearNotifications() {
		appState.setProgress(0)
		const {status} = await userAPI.clearNotifications()
		appState.setProgress(100)
		if (status) {
			this.setNotifications([])
		}
		return status
	}
}

export default new UserState()
