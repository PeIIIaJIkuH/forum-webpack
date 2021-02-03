import React from 'react'
import s from './Header.module.css'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import {signout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import logo from '../../assets/img/logo.svg'
import bell from '../../assets/img/bell.svg'
import find from '../../assets/img/loupe.svg'
import profileLogo from '../../assets/img/profile.svg'

const Header = ({isAuth, signout}) => (
	<header className={s.header}>
		<div className='container'>
			<div className={s.inner}>
				<div className={s.logo}>
					<img src={logo} alt='logo'/>
					<div>
						foru<span>me</span>
					</div>
				</div>
				<div className={s.search}>
					<img src={find} alt='magnifying glass'/>
					<input type='text' placeholder='Search for Topics'/>
				</div>
				{isAuth ?
					<div className={s.actions}>
						<div className={s.bell}>
							<img src={bell} alt='bell'/>
						</div>
						<div className={s.profile}>
							<img src={profileLogo} alt='profile logo'/>
						</div>
						<button className={s.signout} onClick={() => {
							signout()
						}}>Sign Out
						</button>
					</div> :
					<Link to='/signin'>Sign In</Link>
				}
			</div>
		</div>
	</header>
)

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)