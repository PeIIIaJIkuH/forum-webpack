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
		appState.setIsLoading(true)
		const {data, status} = await userAPI.fetchUser(userId)
		appState.setIsLoading(false)
		if (status) {
			this.setUser(data)
		}
		return status
	}

	async fetchNotifications() {
		appState.setIsLoading(true)
		const {data, status} = await userAPI.fetchNotifications()
		appState.setIsLoading(false)
		if (status) {
			this.setNotifications(data)
		}
	}

	async clearNotifications() {
		appState.setIsLoading(true)
		const {status} = await userAPI.clearNotifications()
		appState.setIsLoading(false)
		if (status) {
			this.setNotifications([])
		}
		return status
	}
}

export default new UserState()
