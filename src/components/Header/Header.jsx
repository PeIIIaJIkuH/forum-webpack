import React from 'react'
import s from './Header.module.css'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import {signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/logo.svg'
import profile from '../../assets/img/profile.svg'
import {Button, Image, Input, Layout} from 'antd'

const Header = ({isAuth, signout}) => (
	<Layout.Header className={s.header}>
		<Link to='/' className={s.logo}>
			<Image width={50} src={logo} preview={false} alt='logo'/>
			foru<span>me</span>
		</Link>
		<Input.Search className={s.search} placeholder='Search something' enterButton size='middle'/>
		{isAuth ?
			<span className={s.actions}>
				<span className={s.profile}>
					<Image width={40} src={profile} alt='profile' preview={false}/>
				</span>
				<Button type='link' onClick={() => {
					signout()
				}}>
					Sign Out
				</Button>
			</span> :
			<Link to='/signin'>Sign In</Link>}
	</Layout.Header>
)

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)