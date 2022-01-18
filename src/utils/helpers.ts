import moment from 'moment'
import {IReaction} from '../types'
import * as queryString from 'query-string'

export const updateObjectInArray = (items: any, itemProp: any, prop: string, newObjProp: {}) => items.map((e: any) =>
	e[prop] === itemProp ? {...e, ...newObjProp} : e,
)

export const getObjectInArray = (items: any, itemProp: any, prop: string) => {
	return items.find((e: any) => e[prop] === itemProp)
}

export const getRating = (userRating: number, rating: number, reaction: IReaction): [u: IReaction, p: number] => {
	if (userRating !== 0) {
		if (userRating === reaction) {
			userRating = 0
			rating -= reaction
		} else {
			userRating *= -1
			rating += 2 * userRating
		}
	} else {
		userRating = reaction
		rating += reaction
	}
	return [userRating as IReaction, rating]
}

export const getDateDifference = (createdAt: number, long?: boolean) => {
	const date = moment(new Date(createdAt * 1000))
	const now = moment()
	const arr = ['months', 'days', 'hours', 'minutes', 'seconds'].map(e => ({
		// @ts-ignore
		num: now.diff(date, e),
		type: e,
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

export const groupBy = (key: string) => (array: any[]) =>
	array && array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key]
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
		return objectsByKeyValue
	}, {})

export const defaultValidator = (field: string, isSignup?: boolean) => ({
	validator: async (_: any, value: any) => new Promise<void>((resolve, reject) => {
		if (!value)
			reject(`Please enter ${field.toLowerCase()}!`)
		if (field === 'Categories') {
			value.forEach((tag: string) => {
				if (!tag.trim())
					reject(`Category can not be empty!`)
			})
		} else {
			if (!value.trim())
				reject(`${field} can not be empty!`)
			if (isSignup) {
				if (field === 'Username' && !RegExp(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
					.test(value))
					reject('Incorrect username!')
				if (field === 'Password' && !RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z._]{6,20}$/)
					.test(value))
					reject('Incorrect password!')
			}
		}
		resolve()
	}),
})

export const categoriesQuery = (array: string | string[]) => queryString.stringify({categories: array}, {
	arrayFormat: 'comma',
	skipEmptyString: true,
	skipNull: true,
})
