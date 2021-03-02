import {postAPI} from '../api/requests'
import {getObjectInArray, getRating, updateObjectInArray} from '../utils/helpers/helpers'
import {setProgress} from './app-reducer'
import {Reaction, TComment} from '../types/types'
import {ActionTypes, ThunkType} from './store'

type InitialState = {
	all: TComment[] | null
	userComments: { [key: string]: TComment[] } | null
}
const initialState: InitialState = {
	all: null,
	userComments: null
}

type Action = ActionTypes<typeof commentsActions>

export const commentsReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case 'comments/SET_COMMENTS':
			return {...state, all: action.all}
		case 'comments/DELETE_COMMENT':
			return {
				...state,
				all: state.all && state.all.filter((comment: TComment) => comment.id !== action.id)
			}
		case 'comments/SET_USER_COMMENTS':
			return {...state, userComments: action.all}
		case 'comments/DELETE_USER_COMMENT':
			const id = action.id,
				postID = action.postID,
				comments = {...state.userComments}
			const postComments = comments[postID].filter((comment: TComment) => comment.id !== id)
			comments[postID] = postComments
			return {...state, userComments: comments}
		case 'comments/EDIT_COMMENT':
			if (state.all) {
				const cComments = [...state.all]
				const index = cComments && cComments.findIndex((comment: TComment) => comment.id === action.id)
				if (cComments) {
					cComments[index].content = action.content
				}
				return {...state, all: cComments}
			}
			return state
		case 'comments/EDIT_USER_COMMENT':
			const ucComments = {...state.userComments}
			const pComments = [...ucComments[action.postID]]
			const uIndex = pComments.findIndex(comment => comment.id === action.id)
			pComments[uIndex].content = action.content
			ucComments[action.postID] = pComments
			return {...state, userComments: ucComments}
		case 'comments/SET_COMMENT_RATING':
			const comment = getObjectInArray(state.all, action.id, 'id')
			const [commentUserRating, commentRating] = getRating(comment.userRating, comment.commentRating, action.reaction)
			return {
				...state,
				all: updateObjectInArray(state.all, action.id, 'id',
					{commentRating, userRating: commentUserRating})
			}
		default:
			return state
	}
}

export const commentsActions = {
	setCommentsAC: (all: TComment[] | null) => ({
		type: 'comments/SET_COMMENTS',
		all
	} as const),
	setUserCommentsAC: (all: { [key: string]: TComment[] } | null) => ({
		type: 'comments/SET_USER_COMMENTS',
		all
	} as const),
	deleteCommentAC: (id: number) => ({
		type: 'comments/DELETE_COMMENT',
		id
	} as const),
	deleteUserCommentAC: (id: number, postID: number) => ({
		type: 'comments/DELETE_USER_COMMENT',
		id, postID
	} as const),
	editCommentAC: (id: number, content: string) => ({
		type: 'comments/EDIT_COMMENT',
		id, content
	} as const),
	editUserCommentAC: (id: number, postID: number, content: string) => ({
		type: 'comments/EDIT_USER_COMMENT',
		id, postID, content
	} as const),
	setCommentRatingAC: (id: number, reaction: Reaction) => ({
		type: 'comments/SET_COMMENT_RATING',
		id, reaction
	} as const)
}

type Thunk = ThunkType<void, Action>
type ThunkBool = ThunkType<boolean, Action>

export const requestComments = (id: number): Thunk => async dispatch => {
	const data = await postAPI.getComments(id)
	await dispatch(commentsActions.setCommentsAC(data.data))
}

export const deleteComment = (id: number, postID?: number): ThunkBool => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.deleteComment(id)
	if (data && data.status) {
		res = true
		if (!postID) {
			await dispatch(commentsActions.deleteCommentAC(id))
		} else {
			await dispatch(commentsActions.deleteUserCommentAC(id, postID))
		}
	}
	await dispatch(setProgress(100))
	return res
}

export const editComment = (id: number, authorID: number, postID: number, content: string, isUserPage: boolean): ThunkBool => async dispatch => {
	let res = false
	await dispatch(setProgress(0))
	const data = await postAPI.editComment(id, authorID, postID, content)
	if (data && data.status) {
		res = true
		if (!isUserPage) {
			await dispatch(commentsActions.editCommentAC(id, content))
		} else {
			await dispatch(commentsActions.editUserCommentAC(id, postID, content))
		}
	}
	await dispatch(setProgress(100))
	return res
}

export const setCommentRating = (id: number, postID: number, reaction: Reaction): ThunkBool => async dispatch => {
	await dispatch(setProgress(0))
	let res = false
	const data = await postAPI.rateComment(id, postID, reaction)
	if (data && data.status) {
		res = true
		await dispatch(commentsActions.setCommentRatingAC(id, reaction))
	}
	await dispatch(setProgress(100))
	return res
}