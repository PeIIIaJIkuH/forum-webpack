import {ApiPromise, IReaction} from '../types'
import {updatingAxios} from './index'

const fetchComments = (postId: number): ApiPromise => updatingAxios.post('comment/filter', {
	option: 'post',
	post_id: postId,
})

const createComment = (postId: number, content: string): ApiPromise => updatingAxios.post('comment/create', {
	post_id: postId,
	content,
})

const deleteComment = (commentId: number): ApiPromise => updatingAxios.delete(`comment/delete/${commentId}`)

const editComment = (commentId: number, userId: number, postId: number,
                     content: string): ApiPromise => updatingAxios.put('comment/edit', {
	id: commentId,
	authorID: userId,
	post_id: postId,
	content,
})

const rateComment = (commentId: number, postId: number, reaction: IReaction) => updatingAxios.post('comment/rate', {
	commentID: commentId,
	postID: postId,
	reaction,
})

export const commentsAPI = {
	fetchComments,
	createComment,
	deleteComment,
	editComment,
	rateComment,
}
