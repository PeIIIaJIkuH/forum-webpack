export interface IUser {
	id: number
	username: string
	email: string
	createdAt: number
	lastActive: number
}

export interface IPost {
	id: number
	title: string
	content: string
	author: IUser
	categories: ICategory[]
	postRating: number
	userRating: IReaction
	createdAt: number
	commentsNumber: number
	isImage: boolean
	imagePath: string
}

export interface IComment {
	id: number
	post_id: number
	content: string
	createdAt: number
	editedAt: number
	author: IUser
	commentRating: number
	userRating: IReaction
}

export type IReaction = -1 | 0 | 1

export interface ICategory {
	id: number
	name: string
}

export interface IPostRating {
	author: IUser
	rate: IReaction
}

export interface ICommentRating {
	id: number
	userID: number
	commentID: number
	rate: IReaction
	author: IUser
}

export interface IDefaultNotification {
	id: number
	receiver_id: number
	post_id: number
	rate_id: number
	comment_id: number
	createdAt: number
	post: IPost
	postRating: IPostRating
	comment: IComment
	commentRating: ICommentRating
}

export interface IRoleNotification {
	id: number
	receiver_id: number
	createdAt: number
	accepted: boolean
	declined: boolean
	demoted: boolean
}

export interface IReportNotification {
	id: number
	createdAt: number
	receiver_id: number
	approved: boolean
	deleted: boolean
}

export interface IPostNotification {
	id: number
	createdAt: number
	receiver_id: number
	approved: boolean
	deleted: boolean
	banned: boolean
}

export enum EUserRole {
	guest = -1,
	user = 0,
	moderator = 1,
	admin = 2
}

export interface ApiResponse {
	status: boolean
	code: number
	message: string
	data: any
}

export type ApiPromise = Promise<ApiResponse>

export interface IRoleRequest {
	id: number
	userID: number
	createdAt: number
	pending: number
	user: IUser
}

export interface IPostReport {
	id: number
	postID: number
	moderatorID: number
	pending: boolean
	createdAt: number
	post_title: string
}
