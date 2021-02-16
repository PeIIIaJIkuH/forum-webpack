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
import Input from 'antd/lib/input'
import Image from 'antd/lib/image'
import Layout from 'antd/lib/layout'
import Affix from 'antd/lib/affix'
import {notificationType, openNotification} from '../../utils/helpers/helpers'
import LoadingBar from 'react-top-loading-bar'
import {setProgress, setUrlTo} from '../../redux/app-reducer'
import Actions from './Actions'

const Header = ({
					isAuth, signout, username, userID, progress, setProgress, location, setUrlTo,
					notifications, requestNotifications, deleteNotification
				}) => {
	React.useEffect(() => {
		requestNotifications()
	}, [requestNotifications])

	const onSignout = () => {
		const ok = signout()
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not logout!')
		}
	}

	const onFinished = () => {
		setProgress(0)
	}

	const onSearch = () => {
		openNotification(notificationType.WARNING, 'This feature will be added soon!')
	}

	const onClick = async () => {
		await setUrlTo(location.pathname)
	}

	return (
		<Affix offsetTop={1} className='headerWrapper'>
			<Layout.Header className={s.header}>
				<LoadingBar color='#40a9ff' progress={progress} onLoaderFinished={onFinished}/>
				<Link to='/' className={s.logo}>
					<Image width={50} src={logo} preview={false} alt='logo'/>
					foru<span>me</span>
				</Link>
				<Input.Search className={s.search} placeholder='Search something' enterButton size='middle'
							  onSearch={onSearch}/>
				{isAuth ?
					<Actions notifications={notifications} onSignout={onSignout} userID={userID} username={username}
							 deleteNotification={deleteNotification}/> :
					<Link to='/auth/signin'>
						<Button className={s.auth} type='link' onClick={onClick}>Sign In</Button>
					</Link>}
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
	deleteNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))