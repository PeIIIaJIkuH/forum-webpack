import React from 'react'
import s from './User.module.css'
import Card from 'antd/lib/card'
import Typography from 'antd/lib/typography'
import {getDateDifference} from '../../utils/helpers/helpers'

const {Title} = Typography

const UserInfo = ({user}) => {
	let createdAt, lastActive
	if (user) {
		createdAt = getDateDifference(user.createdAt)
		lastActive = getDateDifference(user.lastActive)
	}

	return user ? (
		<Card className={s.userInfo} title={<Title level={2}>{user.username}</Title>}>
			<Title level={5}>E-mail: </Title>
			<p>{user.email}</p>
			<Title level={5}>Created: </Title>
			<p>{createdAt ? `${createdAt.num} ${createdAt.type.slice(0, -1)}${createdAt.num > 1 ? 's' : ''} ago` : 'Just now'}</p>
			<Title level={5}>Last active: </Title>
			<p>{lastActive ? `${lastActive.num} ${lastActive.type.slice(0, -1)}${lastActive.num > 1 ? 's' : ''} ago` : 'Just now'}</p>
		</Card>
	) : <></>
}

export default UserInfo