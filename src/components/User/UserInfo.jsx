import React from 'react'
import s from './User.module.css'
import Card from 'antd/lib/card'
import Typography from 'antd/lib/typography'
import {getDateDifference} from '../../utils/helpers/helpers'
import moment from 'moment'

const {Title} = Typography

const UserInfo = ({user}) => {
	let lastActive
	if (user) {
		lastActive = getDateDifference(user.lastActive, true)
	}

	const created = moment(user.createdAt * 1000).format('DD MM YYYY hh:mm:ss')
	const active = lastActive ? `${lastActive.num}${lastActive.type.slice(0, -1)}${lastActive.num > 1 ? 's' : ''}` : 'Just now'

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