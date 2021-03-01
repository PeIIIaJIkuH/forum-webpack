import React, {FC} from 'react'
import s from './Header.module.css'
import Button from 'antd/lib/button'
import {Link} from 'react-router-dom'
import {Notifications} from './Notifications'
import {useSelector} from 'react-redux'
import {userIDSelector, usernameSelector} from '../../redux/selectors'

type Props = {
	onSignout: () => void
}

export const Actions: FC<Props> = ({onSignout}) => {
	const userID = useSelector(userIDSelector),
		username = useSelector(usernameSelector)

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