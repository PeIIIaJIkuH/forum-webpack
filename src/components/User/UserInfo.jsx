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

	const created = createdAt ? `${createdAt.num} ${createdAt.type.slice(0, -1)}${createdAt.num > 1 ? 's' : ''} ago` : 'Just now',
		active = lastActive ? `${lastActive.num} ${lastActive.type.slice(0, -1)}${lastActive.num > 1 ? 's' : ''} ago` : 'Just now'

	return user && (
		<section className={s.userInfo}>
			<Card title={<Title level={2}>{user.username}</Title>}>
				<Title level={5}>E-mail: </Title>
				<p>{user.email}</p>
				<Title level={5}>Created: </Title>
				<p>{created}</p>
				<Title level={5}>Last active: </Title>
				<p>{active}</p>
			</Card>
		</section>
	)
}

export default UserInfo