import React, {FC} from 'react'
import s from './Header.module.css'
import Popover from 'antd/lib/popover'
import Button from 'antd/lib/button'
import {CloseOutlined, MenuOutlined} from '@ant-design/icons'
import {SetMenuOpen, setMenuOpen} from '../../redux/app-reducer'
import {connect} from 'react-redux'
import {menuOpenSelector} from '../../redux/selectors'
import Notifications from './Notifications'
import history from '../../history'
import {State} from '../../redux/store'

type OwnProps = {
	userID: number | null
	username: string | null
	onSignout: () => void
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps

const MobileActions: FC<Props> = ({userID, username, onSignout, menuOpen, setMenuOpen}) => {
	const [visible, setVisible] = React.useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const onClick = () => {
		setVisible(false)
		setMenuOpen(false)
		history.push(`/user/${userID}`)
	}

	return (
		<div className='mobileActions'>
			<Notifications/>
			<Popover placement='bottom' content={(
				<div className={s.content}>
					<Button type='link' onClick={onClick}>
						Profile
					</Button>
					<Button type='link' danger onClick={onSignout}>
						Sign Out
					</Button>
				</div>
			)} trigger='click'
					 visible={visible}
					 onVisibleChange={handleVisibleChange}>
				<Button type='text'>{username}</Button>
			</Popover>
			<Button type='text' icon={!menuOpen ? <MenuOutlined/> : <CloseOutlined/>}
					onClick={toggleMenu}/>
		</div>
	)
}

type MapStateToProps = {
	menuOpen: boolean
}
const mapStateToProps = (state: State): MapStateToProps => ({
	menuOpen: menuOpenSelector(state)
})

type MapDispatchToProps = {
	setMenuOpen: SetMenuOpen
}
const mapDispatchToProps = {
	setMenuOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileActions)