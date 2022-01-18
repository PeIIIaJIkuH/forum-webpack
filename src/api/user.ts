import {ApiPromise} from '../types'
import {defaultAxios} from './index'

const fetchUser = (userId: number): ApiPromise => defaultAxios.get(`user/${userId}`)

const fetchNotifications = (): ApiPromise => defaultAxios.get('notifications')

const clearNotifications = (): ApiPromise => defaultAxios.delete('notifications/delete/')

export const userAPI = {
	fetchUser,
	fetchNotifications,
	clearNotifications,
}
