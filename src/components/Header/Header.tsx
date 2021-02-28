import React, {FC} from 'react'
import s from './Header.module.css'
import {isAuthSelector, progressSelector, userIDSelector, usernameSelector} from '../../redux/selectors'
import {RequestNotifications, requestNotifications, Signout, signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import Button from 'antd/lib/button'
import Image from 'antd/lib/image'
import Layout from 'antd/lib/layout'
import Affix from 'antd/lib/affix'
import LoadingBar from 'react-top-loading-bar'
import {SetMenuOpen, setMenuOpen, SetProgress, setProgress, SetUrlTo, setUrlTo} from '../../redux/app-reducer'
import Actions from './Actions'
import {useMediaQuery} from 'react-responsive'
import MobileActions from './MobileActions'
import {State} from '../../redux/store'
import message from 'antd/lib/message'

type Props = MapStateToProps & MapDispatchToProps & RouteComponentProps

const Header: FC<Props> = ({
							   isAuth, signout, username, userID,
							   progress, setProgress, location, setUrlTo,
							   requestNotifications, setMenuOpen
						   }) => {
	React.useEffect(() => {
		requestNotifications()
	}, [requestNotifications, location.pathname])

	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})

	const onSignout = () => {
		const ok: any = signout()
		setMenuOpen(false)
		if (!ok)
			message.error('Can not logout!')
	}

	const onFinished = () => {
		setProgress(0)
	}

	const onAuth = async () => {
		await setUrlTo(location.pathname)
	}

	return (
		<Affix offsetTop={1} className={s.headerWrapper}>
			<Layout.Header className={s.header}>
				<div className={s.inner}>
					<LoadingBar color='#40a9ff' progress={progress} onLoaderFinished={onFinished}/>
					<Link to='/' className={s.logo}>
						<Image width={50} src={logo} preview={false} alt='logo'/>
						foru<span>me</span>
					</Link>
					{isAuth ? !isTabletOrMobile ?
						<Actions userID={userID} username={username} onSignout={onSignout}/>
						:
						<MobileActions userID={userID} username={username} onSignout={onSignout}/>
						:
						<Link to='/auth/signin'>
							<Button className={s.auth} type='link' onClick={onAuth}>Sign In</Button>
						</Link>
					}
				</div>
			</Layout.Header>
		</Affix>
	)
}

type MapStateToProps = {
	isAuth: boolean
	username: string | null
	userID: number | null
	progress: number
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state),
	username: usernameSelector(state),
	userID: userIDSelector(state),
	progress: progressSelector(state)
})

type MapDispatchToProps = {
	signout: Signout
	setProgress: SetProgress
	setUrlTo: SetUrlTo
	setMenuOpen: SetMenuOpen
	requestNotifications: RequestNotifications
}
const mapDispatchToProps: MapDispatchToProps = {
	signout,
	setProgress,
	setUrlTo,
	requestNotifications,
	setMenuOpen
}

export default connect<MapStateToProps, MapDispatchToProps, unknown, State>(mapStateToProps, mapDispatchToProps)(withRouter<any, any>(Header))