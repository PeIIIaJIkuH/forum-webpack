import React, {FC, useState} from 'react'
import s from './Header.module.css'
import Popover from 'antd/lib/popover'
import Button from 'antd/lib/button'
import {CloseOutlined, MenuOutlined} from '@ant-design/icons'
import {setMenuOpen} from '../../redux/app-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {menuOpenSelector, userIDSelector, usernameSelector} from '../../redux/selectors'
import {Notifications} from './Notifications'
import {history} from '../../history/history'

type Props = {
	onSignout: () => void
}

export const MobileActions: FC<Props> = ({onSignout}) => {
	const userID = useSelector(userIDSelector),
		username = useSelector(usernameSelector),
		menuOpen = useSelector(menuOpenSelector)

	const dispatch = useDispatch()

	const [visible, setVisible] = useState(false)

	const toggleMenu = () => {
		dispatch(setMenuOpen(!menuOpen))
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const onClick = () => {
		setVisible(false)
		dispatch(setMenuOpen(false))
		history.push(`/user/${userID}`)
	}

	const content = <>
		<div className={s.content}>
			<Button type='link' onClick={onClick}>
				Profile
			</Button>
			<Button type='link' danger onClick={onSignout}>
				Sign Out
			</Button>
		</div>
	</>

	return <>
		<div className='mobileActions'>
			<Notifications/>
			<Popover placement='bottom' content={content} trigger='click'
					 visible={visible}
					 onVisibleChange={handleVisibleChange}>
				<Button type='text'>{username}</Button>
			</Popover>
			<Button type='text' icon={!menuOpen ? <MenuOutlined/> : <CloseOutlined/>}
					onClick={toggleMenu}/>
		</div>
	</>
}