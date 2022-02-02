import React, {FC} from 'react'
import userState from '../../store/userState'
import Empty from 'antd/lib/empty'
import s from '../AdminDashboard/AdminDashboard.module.css'
import Card from 'antd/lib/card'
import {observer} from 'mobx-react-lite'
import {getDateDifference} from '../../utils/helpers'

export const PostNotifications: FC = observer(() => {
	return userState.postNotifications.length ? (
		<>
			{userState.postNotifications.map(({
				                                  id, deleted, createdAt,
			                                  }) => {
				let text
				if (deleted) {
					text = 'Your post was deleted'
				} else {
					text = 'error'
				}
				const created = getDateDifference(createdAt)

				return (
					<div key={id} className={s.notification}>
						<div>{text}</div>
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
