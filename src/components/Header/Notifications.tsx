import React, {FC, useState} from 'react'
import s from './Header.module.css'
import Popover from 'antd/lib/popover'
import Button from 'antd/lib/button'
import {BellOutlined, DeleteOutlined} from '@ant-design/icons'
import Badge from 'antd/lib/badge'
import {getDateDifference} from '../../utils/helpers'
import {Link} from 'react-router-dom'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import userState from '../../store/userState'

export const Notifications: FC = observer(() => {
	const [loading, setLoading] = useState(false),
		[visible, setVisible] = useState(false)

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const onClose = async () => {
		setLoading(true)
		const status = await userState.clearNotifications()
		setLoading(false)
		setVisible(false)
		if (!status) {
			message.error('Can not delete notifications!')
		}
	}

	const title = (
		<div className={s.title}>
			<div>Notifications</div>
			<Button type='text' size='small' onClick={onClose} loading={loading} disabled={!userState.notifications}
			        icon={<DeleteOutlined className={s.closeIcon}/>}
			/>
		</div>
	)

	const content = userState.notifications.length !== 0 ? userState.notifications.map(notification => {
		let username, userID, text, link
		if (notification.postRating) {
			username = notification.postRating.author.username
			userID = notification.postRating.author.id
			text = notification.postRating.rate === 1 ? 'upvoted' : 'downvoted'
			link = <Link to={`/post/${notification.post_id}`}>post</Link>
		} else if (notification.commentRating) {
			username = notification.commentRating.author.username
			userID = notification.commentRating.author.id
			text = notification.commentRating.rate === 1 ? 'upvoted' : 'downvoted'
			link = <Link to={`/post/${notification.comment.post_id}`}>comment</Link>
		} else if (notification.comment) {
			username = notification.comment.author.username
			userID = notification.comment.author.id
			text = 'commented'
			link = <Link to={`/post/${notification.post_id}`}>post</Link>
		} else
			text = 'error'
		const created = getDateDifference(notification.createdAt)

		return (
			<div key={notification.id} className={s.notification}>
				<div>
					<Link to={`/user/${userID}`}>{username}</Link> {text} your {link}
				</div>
				<div className={s.wrapper}>
					<div className={s.createdAt}>{created ?
						`${created.num}${created.type}` : 'Just now'}
					</div>
				</div>
			</div>
		)
	}) : <div style={{color: '#959595'}}>No Data</div>

	return (
		<Badge className={s.notifications} offset={[-5, 5]} size='small' overflowCount={10}
		       count={userState.notifications.length}
		>
			<Popover placement='bottom' title={title} content={content} trigger='click' visible={visible}
			         onVisibleChange={handleVisibleChange} overlayClassName={s.popoverNotifications}
			>
				<Button type='text' icon={<BellOutlined/>}/>
			</Popover>
		</Badge>
	)
})
