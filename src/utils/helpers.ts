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
		if (!value) {
			reject(`${field.toLowerCase()} is required`)
		}
		if (field === 'Categories') {
			value.forEach((tag: string) => {
				if (!tag.trim()) {
					reject(`categories can not be empty`)
				}
			})
		} else {
			if (!value.trim()) {
				reject(`${field.toLowerCase()} can not be empty`)
			}
			if (isSignup) {
				if (field === 'Username' && !RegExp(/^.{4,20}$/).test(value)) {
					reject('4-20 characters long')
				}
				if (field === 'Password' && !RegExp(/^.{6,20}$/).test(value)) {
					reject('6-20 characters long')
				}
				if (field === 'Username' && !RegExp(/^[a-zA-Z0-9_.]*$/).test(value)) {
					reject('a-z, A-Z, 0-9, _, .')
				}
				if (field === 'Password' && !RegExp(/^[a-zA-Z0-9~!@#$%^&*()\-_=+]*$/).test(value)) {
					reject('a-z, A-Z, 0-9, ~!@#$%^&*()-_=+')
				}
				if (field === 'Username' && !RegExp(/^(?![_.]).*(?<![_.])$/).test(value)) {
					reject('no _ or . at start or end')
				}
				if (field === 'Username' && !RegExp(/^(?!.*[_.]{2}).*$/).test(value)) {
					reject('__, .., _., ._ are not allowed')
				}
				if (field === 'Password' && !RegExp(/[a-z]/).test(value)) {
					reject('at least 1 lowercase letter')
				}
				if (field === 'Password' && !RegExp(/[A-Z]/).test(value)) {
					reject('at least 1 uppercase letter')
				}
				if (field === 'Password' && !RegExp(/[0-9]/).test(value)) {
					reject('at least 1 digit')
				}
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
