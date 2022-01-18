import React, {FC} from 'react'
import s from './Posts.module.css'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers'
import {Link} from 'react-router-dom'
import {Comment} from './Comment'
import {IComment, IUser} from '../../types'
import {observer} from 'mobx-react-lite'
import authState from '../../store/authState'

type Props = {
	comments: IComment[] | null
	userPage?: boolean
}

export const Comments: FC<Props> = observer(({comments, userPage}) => {
	const data = comments ? comments.map(comment => {
		const created = getDateDifference(comment.createdAt),
			check = comment.author.id === authState.user?.id

		return {
			author: comment.author,
			content: comment.content,
			datetime: created ?
				`${created.num}${created.type}` : 'Just now',
			comment: comment,
			check: check,
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
		check: boolean
	}
	const renderItem = (item: obj) => {
		const author = (
			<Link to={`/user/${item.author.id}`}>
				{item.author.username}
			</Link>
		)

		return (
			<li>
				<Comment author={author} content={item.content} datetime={item.datetime} comment={item.comment}
				         check={item.check} userPage={userPage}
				/>
			</li>
		)
	}

	return (
		<List header={!userPage ? header : null} dataSource={data} renderItem={renderItem}
		      locale={{emptyText: 'No Comments'}}
		/>
	)
})
