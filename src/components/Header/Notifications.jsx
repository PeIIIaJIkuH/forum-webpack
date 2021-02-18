import React from 'react'
import s from './Header.module.css'
import Popover from 'antd/lib/popover'
import Button from 'antd/lib/button'
import {BellOutlined, DeleteOutlined} from '@ant-design/icons'
import Badge from 'antd/lib/badge'
import {connect} from 'react-redux'
import {notificationsSelector} from '../../redux/selectors'
import {getDateDifference, notificationType, openNotification} from '../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import {deleteNotification} from '../../redux/auth-reducer'

const Notifications = ({notifications, deleteNotification}) => {
	const [loading, setLoading] = React.useState(false),
		[visible, setVisible] = React.useState(false)

	const handleVisibleChange = visible => {
		setVisible(visible)
	}

	const onClose = async () => {
		setLoading(true)
		const ok = await deleteNotification()
		setLoading(false)
		setVisible(false)
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not delete notifications!')
		}
	}

	const title = (
		<div className={s.title}>
			<div>Notifications</div>
			<Button type='text' size='small' onClick={onClose} loading={loading} disabled={!notifications}
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
		<Badge className={s.notifications} offset={[-5, 5]} size='small' overflowCount={10}
			   count={notifications && notifications.length}>
			<Popover placement='bottom' title={title} content={content} trigger='click' visible={visible}
					 onVisibleChange={handleVisibleChange}>
				<Button type='text' icon={<BellOutlined/>}/>
			</Popover>
		</Badge>
	)
}

const mapStateToProps = state => ({
	notifications: notificationsSelector(state)
})

const mapDispatchToProps = {
	deleteNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)