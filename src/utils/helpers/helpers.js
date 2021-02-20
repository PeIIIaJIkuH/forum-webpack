import moment from 'moment'
import notification from 'antd/lib/notification'

export const updateObjectInArray = (items, itemId, prop, newObjProp) => items.map(e =>
	e[prop] === itemId ? {...e, ...newObjProp} : e
)

export const getObjectInArray = (items, itemId, prop) => {
	return items.find(e => e[prop] === itemId)
}

export const getPostRating = (userRating, postRating, reaction) => {
	if (userRating !== 0) {
		if (userRating === reaction) {
			userRating = 0
			postRating -= reaction
		} else {
			userRating *= -1
			postRating += 2 * userRating
		}
	} else {
		userRating = reaction
		postRating += reaction
	}
	return [userRating, postRating]
}

export const getDateDifference = (createdAt, long) => {
	const date = moment(new Date(createdAt * 1000))
	const now = moment()
	const arr = ['months', 'days', 'hours', 'minutes', 'seconds'].map(e => ({
		num: now.diff(date, e),
		type: e
	}))
	if (!long) {
		arr[0].type = 'M'
		arr[1].type = 'D'
		arr[2].type = 'h'
		arr[3].type = 'm'
		arr[4].type = 's'
	}
	return arr.find(e => {
		if (e.num > 0) return `${+e.num} ${e.type}`
		return false
	})
}

export const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

export const groupBy = key => array =>
	array && array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key]
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
		return objectsByKeyValue
	}, {})

export const notificationType = {
	SUCCESS: 'success',
	INFO: 'info',
	WARNING: 'warning',
	ERROR: 'error'
}


export const openNotification = (type, message, description) => {
	notification[type]({message, description, placement: 'bottomRight', duration: 3})
}

export const defaultValidator = field => ({
	validator: async (_, value) => new Promise((resolve, reject) => {
		if (!value)
			reject(`Please enter ${field.toLowerCase()}!`)
		if (field === 'Categories') {
			value.forEach(tag => {
				if (!tag.trim())
					reject(`Category can not be empty!`)
			})
		} else {
			if (!value.trim())
				reject(`${field} can not be empty!`)
			if (field === 'Username' && !RegExp(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
				.test(value))
				reject('Incorrect username!')
			if (field === 'Password' && !RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z._]{6,20}$/)
				.test(value))
				reject('Incorrect password!')
		}
		resolve()
	})
})
