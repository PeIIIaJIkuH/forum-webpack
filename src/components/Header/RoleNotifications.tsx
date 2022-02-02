import React, {FC} from 'react'
import userState from '../../store/userState'
import Empty from 'antd/lib/empty'
import s from '../AdminDashboard/AdminDashboard.module.css'
import Card from 'antd/lib/card'
import {observer} from 'mobx-react-lite'
import {getDateDifference} from '../../utils/helpers'

export const RoleNotifications: FC = observer(() => {
	return userState.roleNotifications.length ? (
		<>
			{userState.roleNotifications.map(({
				                                  id, accepted, declined, demoted, createdAt,
			                                  }) => {
				let text
				if (accepted) {
					text = 'Your promotion to moderator was accepted'
				} else if (declined) {
					text = 'Your promotion to moderator was declined'
				} else if (demoted) {
					text = 'You were demoted from moderators'
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
