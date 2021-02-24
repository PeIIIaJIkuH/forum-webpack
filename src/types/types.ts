export type TUser = {
	id: number
	username: string
	email: string
	createdAt: number
	lastActive: number
}

export type TPost = {
	id: number
	title: string
	content: string
	author: TUser
	categories: Category[]
	postRating: number
	userRating: Reaction
	createdAt: number
	commentsNumber: number
	isImage: boolean
	imagePath: string
}

export type TComment = {
	id: number
	post_id: number
	content: string
	createdAt: number
	editedAt: number
	author: TUser
	commentRating: number
	userRating: Reaction
}

export type Reaction = -1 | 0 | 1

export type Category = {
	id: number
	name: string
}

export type PostRating = {
	author: TUser
	rate: Reaction
}

export type CommentRating = {
	id: number
	userID: number
	commentID: number
	rate: Reaction
	author: TUser
}

export type TNotification = {
	id: number
	receiver_id: number
	post_id: number
	rate_id: number
	comment_id: number
	createdAt: number
	post: TPost
	postRating: PostRating
	comment: TComment
	commentRating: CommentRating
}