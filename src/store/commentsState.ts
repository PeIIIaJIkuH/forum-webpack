import {makeAutoObservable} from 'mobx'
import {IComment, IReaction} from '../types'
import appState from './appState'
import {commentsAPI} from '../api/comments'
import {getRating} from '../utils/helpers'

class CommentsState {
	allComments: IComment[] = []
	userComments: Record<string, IComment[]> = {}

	constructor() {
		makeAutoObservable(this)
	}

	setAllComments(comments: IComment[] | null) {
		this.allComments = comments || []
	}

	setUserComments(comments: Record<string, IComment[]>) {
		this.userComments = comments
	}

	setPostComments(comments: IComment[], postId: number) {
		this.userComments[postId] = comments
	}

	setRating(comment: IComment, userRating: IReaction, commentRating: number) {
		comment.userRating = userRating
		comment.commentRating = commentRating
	}

	async fetchComments(postId: number) {
		appState.setProgress(0)
		const {data, status} = await commentsAPI.fetchComments(postId)
		appState.setProgress(100)
		if (status) {
			this.setAllComments(data)
		}
	}

	async deleteComment(commentId: number, postId?: number) {
		appState.setProgress(0)
		const {status} = await commentsAPI.fetchComments(commentId)
		appState.setProgress(100)
		if (status) {
			if (!postId) {
				const filteredComments = this.allComments.filter(({id}) => id !== commentId)
				this.setAllComments(filteredComments)
			} else {
				this.setPostComments(this.userComments[postId].filter(({id}) => id !== commentId), postId)
			}
		}
		return status
	}

	async editComment(comment: IComment, content: string) {
		appState.setProgress(0)
		const {status} = await commentsAPI.editComment(comment.id, comment.author.id, comment.post_id, content)
		appState.setProgress(100)
		if (status) {
			comment.content = content
		}
		return status
	}

	async setCommentRating(comment: IComment, reaction: IReaction) {
		appState.setProgress(0)
		const {status} = await commentsAPI.rateComment(comment.id, comment.post_id, reaction)
		appState.setProgress(100)
		if (status) {
			const [userRating, commentRating] = getRating(comment.userRating, comment.commentRating, reaction)
			this.setRating(comment, userRating, commentRating)
		}
		return status
	}
}

export default new CommentsState()
