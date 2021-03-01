import React, {FC, useEffect} from 'react'
import s from './Header.module.css'
import {isAuthSelector, progressSelector} from '../../redux/selectors'
import {requestNotifications, signout} from '../../redux/auth-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import Button from 'antd/lib/button'
import Image from 'antd/lib/image'
import Layout from 'antd/lib/layout'
import Affix from 'antd/lib/affix'
import LoadingBar from 'react-top-loading-bar'
import {setMenuOpen, setProgress, setUrlTo} from '../../redux/app-reducer'
import {Actions} from './Actions'
import {useMediaQuery} from 'react-responsive'
import {MobileActions} from './MobileActions'
import message from 'antd/lib/message'

type Props = RouteComponentProps

const HeaderComponent: FC<Props> = ({location}) => {
	const isAuth = useSelector(isAuthSelector),
		progress = useSelector(progressSelector)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(requestNotifications())
	}, [dispatch, location.pathname])

	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})

	const onSignout = () => {
		const ok: any = dispatch(signout())
		dispatch(setMenuOpen(false))
		if (!ok)
			message.error('Can not logout!').then()
	}

	const onFinished = () => {
		dispatch(setProgress(0))
	}

	const onAuth = async () => {
		await dispatch(setUrlTo(location.pathname))
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
						<Actions onSignout={onSignout}/>
						:
						<MobileActions onSignout={onSignout}/>
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

export const Header = withRouter(HeaderComponent)