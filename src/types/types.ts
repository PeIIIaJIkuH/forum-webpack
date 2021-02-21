export type Category = {
	id: number
	name: string
}

export type User = {
	id: number
	username: string
	email: string
	createdAt: string
	lastActive: string
}

export type Post = {
	id: number
	title: string
	content: string
	author: User
	categories: Category[]
	postRating: number
	userRating: Reaction
	createdAt: number
	commentsNumber: number
}

export type Comment = {
	id: number
	post_id: number
	content: string
	createdAt: number
	editedAt: number
	author: User
}

export type Reaction = -1 | 0 | 1