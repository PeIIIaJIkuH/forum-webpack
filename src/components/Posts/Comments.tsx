import React, {FC} from 'react'
import s from './Posts.module.css'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {isAuthSelector, userIDSelector} from '../../redux/selectors'
import {Comment} from './Comment'
import {TComment, TUser} from '../../types/types'

type Props = {
	comments: TComment[] | null
	userPage?: boolean
}

export const Comments: FC<Props> = ({comments, userPage}) => {
	const userID = useSelector(userIDSelector),
		isAuth = useSelector(isAuthSelector)
	
	const dispatch = useDispatch()
	
	const data = comments ? comments.map(comment => {
		const created = getDateDifference(comment.createdAt),
			check = comment.author.id === userID

		return {
			author: comment.author,
			content: comment.content,
			datetime: created ?
				`${created.num}${created.type}` : 'Just now',
			comment: comment,
			check: check
		}
	}) : undefined

	const header = <>
		<div className={s.commentsTitle}>
			{`${comments ? comments.length : 'No'} comments`}
		</div>
	</>

	type obj = {
		author: TUser
		content: string
		datetime: string
		comment: TComment
		check: boolean
	}
	const renderItem = (item: obj) => {
		const author = <>
			<Link to={`/user/${item.author.id}`}>
				{item.author.username}
			</Link>
		</>

		return <li>
			<Comment author={author} content={item.content} datetime={item.datetime} comment={item.comment}
					 check={item.check} userPage={userPage} isAuth={isAuth} dispatch={dispatch}/>
		</li>
	}

	return <List header={!userPage ? header : null} dataSource={data} renderItem={renderItem}
				 locale={{emptyText: 'No Comments'}}/>
}
