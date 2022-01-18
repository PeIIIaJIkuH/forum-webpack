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

export interface INotification {
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
