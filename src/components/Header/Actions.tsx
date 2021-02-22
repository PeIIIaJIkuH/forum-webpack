import React, {FC} from 'react'
import s from './Header.module.css'
import Button from 'antd/lib/button'
import {Link} from 'react-router-dom'
import Notifications from './Notifications'

type Props = {
	onSignout: () => void
	userID: number | null
	username: string | null
}

const Actions: FC<Props> = ({onSignout, userID, username}) => {
	return (
		<div className={s.actions}>
			<Notifications/>
			<Link className={s.username} to={`/user/${userID}`}>{username}</Link>
			<Button className={s.auth} type='link' danger onClick={onSignout}>
				Sign Out
			</Button>
		</div>
	)
}

export default Actions