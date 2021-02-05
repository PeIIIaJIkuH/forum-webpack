import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import AuthForm from './AuthForm'
import history from '../../history'
import {Card} from 'antd'

const Auth = ({signup, signin, isAuth, isSignup}) => {
	const onSubmit = ({username, email, password}) => {
		if (isSignup) {
			signup(username, email, password)
			history.push('/signin')
		} else {
			signin(username, password)
		}
	}
	
	if (isAuth) return <Redirect to='/'/>
	
	return (
		<div className={s.wrapper}>
			<Card className={s.card} title={isSignup ? 'Sign Up' : 'Sign In'}
				  extra={<Link to={isSignup ? '/signin' : '/signup'}>{isSignup ? 'Sign In' : 'Sign Up'}</Link>}>
				<AuthForm onsubmit={onSubmit} isSignup={isSignup}/>
			</Card>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	signup,
	signin
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)