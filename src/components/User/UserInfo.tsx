import React, {FC} from 'react'
import s from './User.module.css'
import Card from 'antd/lib/card'
import Typography from 'antd/lib/typography'
import {getDateDifference} from '../../utils/helpers/helpers'
import moment from 'moment'
import Descriptions from 'antd/lib/descriptions'
import {TUser} from '../../types/types'

const {Title} = Typography

type Props = {
	user: TUser | null
}

export const UserInfo: FC<Props> = ({user}) => {
	let lastActive
	if (user)
		lastActive = getDateDifference(user.lastActive, true)

	const created = moment(user && user.createdAt * 1000).format('DD.MM.YYYY hh:mm:ss')
	const active = lastActive ?
		`${lastActive.num} ${lastActive.type.slice(0, -1)}${lastActive.num > 1 ? 's' : ''}`
		: 'Just now'

	return user && <>
		<section className={s.userInfo}>
			<Card title={<Title level={2}>{user.username}</Title>}>
				<Descriptions title='User info' column={1}>
					<Descriptions.Item label='E-mail'>{user.username}</Descriptions.Item>
					<Descriptions.Item label='Created at'>{created}</Descriptions.Item>
					<Descriptions.Item label='Last active'>{active}</Descriptions.Item>
				</Descriptions>
			</Card>
		</section>
	</>
}