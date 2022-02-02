import React, {FC} from 'react'
import s from './Posts.module.css'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers'
import {Link} from 'react-router-dom'
import {Comment} from './Comment'
import {EUserRole, IComment, IUser} from '../../types'
import {observer} from 'mobx-react-lite'
import authState from '../../store/authState'

type Props = {
	comments: IComment[] | null
	userPage?: boolean
}

export const Comments: FC<Props> = observer(({comments, userPage}) => {
	const data = comments ? comments.map(comment => {
		const created = getDateDifference(comment.createdAt)
		const isAuthor = comment.author.id === authState.user?.id

		return {
			author: comment.author,
			content: comment.content,
			datetime: created ? `${created.num}${created.type}` : 'Just now',
			comment: comment,
			isAuthor,
			isAdmin: authState.role === EUserRole.admin,
		}
	}) : undefined

	const header = (
		<div className={s.commentsTitle}>
			{`${comments ? comments.length : 'No'} comments`}
		</div>
	)

	type obj = {
		author: IUser
		content: string
		datetime: string
		comment: IComment
		isAuthor: boolean
		isAdmin: boolean
	}
	const renderItem = ({author, content, isAuthor, comment, datetime, isAdmin}: obj) => (
		<li>
			<Comment content={content} datetime={datetime} comment={comment} isAuthor={isAuthor} userPage={userPage}
			         isAdmin={isAdmin} author={(
				<Link to={`/user/${author.id}`}>
					{author.username}
				</Link>
			)}
			/>
		</li>
	)

	return (
		<List header={!userPage ? header : null} dataSource={data} renderItem={renderItem}
		      locale={{emptyText: 'No Comments'}}
		/>
	)
})
