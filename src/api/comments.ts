import {ApiPromise, IReaction} from '../types'
import {defaultAxios} from './index'

const fetchComments = (postId: number): ApiPromise => defaultAxios.post('comment/filter', {
	option: 'post',
	post_id: postId,
})

const createComment = (postId: number, content: string): ApiPromise => defaultAxios.post('comment/create', {
	post_id: postId,
	content,
})

const deleteComment = (commentId: number): ApiPromise => defaultAxios.delete(`comment/delete/${commentId}`)

const editComment = (commentId: number, userId: number, postId: number, content: string): ApiPromise => defaultAxios.put('comment/edit', {
	id: commentId,
	authorID: userId,
	post_id: postId,
	content,
})

const rateComment = (commentId: number, postId: number, reaction: IReaction) => defaultAxios.post('comment/rate', {
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
