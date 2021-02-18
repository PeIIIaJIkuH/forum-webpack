import React from 'react'
import s from './Header.module.css'
import {
	isAuthSelector,
	notificationsSelector,
	progressSelector,
	userIDSelector,
	usernameSelector
} from '../../redux/selectors'
import {deleteNotification, requestNotifications, signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import Button from 'antd/lib/button'
import Image from 'antd/lib/image'
import Layout from 'antd/lib/layout'
import Affix from 'antd/lib/affix'
import {notificationType, openNotification} from '../../utils/helpers/helpers'
import LoadingBar from 'react-top-loading-bar'
import {setMenuOpen, setProgress, setUrlTo} from '../../redux/app-reducer'
import Actions from './Actions'
import {useMediaQuery} from 'react-responsive/src'
import MobileActions from './MobileActions'

const Header = ({
					isAuth, signout, username, userID, progress, setProgress, location, setUrlTo, notifications,
					requestNotifications, deleteNotification, setMenuOpen
				}) => {
	React.useEffect(() => {
		requestNotifications()
	}, [requestNotifications, location.pathname])

	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})

	const onSignout = () => {
		const ok = signout()
		setMenuOpen(false)
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not logout!')
		}
	}

	const onFinished = () => {
		setProgress(0)
	}

	const onAuth = async () => {
		await setUrlTo(location.pathname)
	}

	return (
		<Affix offsetTop={1} className='headerWrapper'>
			<Layout.Header className={s.header} theme='light'>
				<div className={s.inner}>
					<LoadingBar color='#40a9ff' progress={progress} onLoaderFinished={onFinished}/>
					<Link to='/' className={s.logo}>
						<Image width={50} src={logo} preview={false} alt='logo'/>
						foru<span>me</span>
					</Link>
					{isAuth ? (!isTabletOrMobile ? (
						<Actions userID={userID} username={username} onSignout={onSignout}/>
					) : (
						<MobileActions userID={userID} username={username} onSignout={onSignout}/>
					)) : (
						<Link to='/auth/signin'>
							<Button className={s.auth} type='link' onClick={onAuth}>Sign In</Button>
						</Link>
					)}
				</div>
			</Layout.Header>
		</Affix>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	username: usernameSelector(state),
	userID: userIDSelector(state),
	progress: progressSelector(state),
	notifications: notificationsSelector(state)
})

const mapDispatchToProps = {
	signout,
	setProgress,
	setUrlTo,
	requestNotifications,
	deleteNotification,
	setMenuOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))