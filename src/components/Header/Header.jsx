import React from 'react'
import s from './Header.module.css'
import {getIsAuthSelector, getUsernameSelector} from '../../redux/selectors'
import {signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/logo.svg'
import profile from '../../assets/img/profile.svg'
import {Button, Image, Input, Layout} from 'antd'
import history from '../../history'

const Header = ({isAuth, signout, username}) => (
	<Layout.Header className={s.header}>
		<Link to='/' className={s.logo}>
			<Image width={50} src={logo} preview={false} alt='logo'/>
			foru<span>me</span>
		</Link>
		<Input.Search className={s.search} placeholder='Search something' enterButton size='middle'/>
		{isAuth ?
			<span className={s.actions}>
				<span className={s.profile}>
					<span className={s.username}>
						<Link to='/my'>{username}</Link>
					</span>
					<Image width={40} src={profile} alt='profile' preview={false}/>
				</span>
				<Button type='link' danger onClick={() => {
					signout()
				}}>
					Sign Out
				</Button>
			</span> :
			<Link to='/signin'><Button type='link'>Sign In</Button></Link>}
	</Layout.Header>
)

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	username: getUsernameSelector(state)
})

const mapDispatchToProps = {
	signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)