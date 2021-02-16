import React from 'react'
import s from './Header.module.css'
import Badge from 'antd/lib/badge'
import Popover from 'antd/lib/popover'
import Button from 'antd/lib/button'
import {BellOutlined, DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {getDateDifference, notificationType, openNotification} from '../../utils/helpers/helpers'

const Actions = ({notifications, onSignout, userID, username, deleteNotification}) => {
	const [loading, setLoading] = React.useState(false)

	const onClose = async () => {
		setLoading(true)
		const ok = await deleteNotification()
		setLoading(false)
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not delete notifications!')
		}
	}

	const title = (
		<div className={s.title}>
			<div>Notifications</div>
			<Button type='text' size='small' onClick={onClose} loading={loading}
					icon={<DeleteOutlined className={s.closeIcon}/>}/>
		</div>
	)

	const content = notifications ? notifications.map(notification => {
		let username, userID, text
		if (notification.postRating) {
			username = notification.postRating.author.username
			userID = notification.postRating.author.id
			text = notification.postRating.rate === 1 ? 'upvoted' : 'downvoted'
		} else if (notification.comment) {
			username = notification.comment.author.username
			userID = notification.comment.author.id
			text = 'commented'
		} else {
			text = 'error'
		}
		const created = getDateDifference(notification.createdAt)

		return (
			<div key={notification.id} className={s.notification}>
				<div>
					<Link to={`/user/${userID}`}>{username}</Link> {text} your <Link
					to={`/post/${notification.post_id}`}>post</Link>
				</div>
				<div className={s.wrapper}>
					<div className={s.createdAt}>{created ?
						`${created.num} ${created.type.slice(0, -1)}${created.num > 1 ? 's' : ''} ago` : 'Just now'}
					</div>
				</div>
			</div>
		)
	}) : <div style={{color: '#959595'}}>No Data</div>

	return (
		<div className={s.actions}>
			<Badge className={s.notifications} offset={[-5, 5]} size='small'
				   count={notifications && notifications.length} overflowCount={10}>
				<Popover placement='bottomRight' title={title} content={content}
						 trigger='click'>
					<Button type='text' icon={<BellOutlined/>}/>
				</Popover>
			</Badge>
			<span className={s.profile}>
				<span className={s.username}>
					<Link to={`/user/${userID}`}>{username}</Link>
				</span>
			</span>
			<Button className={s.auth} type='link' danger onClick={onSignout}>
				Sign Out
			</Button>
		</div>
	)
}

export default Actions