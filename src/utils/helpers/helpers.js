import moment from 'moment'

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

export const getDateDifference = createdAt => {
	const date = moment(new Date(createdAt * 1000))
	const now = moment()
	const arr = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'].map(e => ({
		num: now.diff(date, e),
		type: e
	}))
	return arr.find(e => {
		if (e.num > 0) return `${+e.num} ${e.type}`
		return false
	})
}