import React, {FC} from 'react'
import userState from '../../store/userState'
import Empty from 'antd/lib/empty'
import s from '../AdminDashboard/AdminDashboard.module.css'
import Card from 'antd/lib/card'
import {observer} from 'mobx-react-lite'
import {Link} from 'react-router-dom'
import {getDateDifference} from '../../utils/helpers'

export const DefaultNotifications: FC = observer(() => {
	return userState.defaultNotifications.length ? (
		<>
			{userState.defaultNotifications.map(({
				                                     id, postRating, post_id,
				                                     commentRating, comment, createdAt,
			                                     }) => {
				let username, userId, text, link
				if (postRating) {
					username = postRating.author.username
					userId = postRating.author.id
					text = postRating.rate === 1 ? 'upvoted' : 'downvoted'
					link = <Link to={`/post/${post_id}`}>post</Link>
				} else if (commentRating) {
					username = commentRating.author.username
					userId = commentRating.author.id
					text = commentRating.rate === 1 ? 'upvoted' : 'downvoted'
					link = <Link to={`/post/${comment.post_id}`}>comment</Link>
				} else if (comment) {
					username = comment.author.username
					userId = comment.author.id
					text = 'commented'
					link = <Link to={`/post/${post_id}`}>post</Link>
				} else {
					text = 'error'
				}
				const created = getDateDifference(createdAt)

				return (
					<div key={id} className={s.notification}>
						<div>
							<Link to={`/user/${userId}`}>{username}</Link> {text} your {link}
						</div>
						<div className={s.wrapper}>
							<div className={s.createdAt}>{created ?
								`${created.num}${created.type}` : 'just now'}
							</div>
						</div>
					</div>
				)
			})}
		</>
	) : (
		<Card>
			<Empty className={s.empty} description='No Notifications'/>
		</Card>
	)
})
