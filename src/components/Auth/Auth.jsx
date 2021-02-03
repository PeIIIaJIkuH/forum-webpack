import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import AuthForm from './AuthForm'
import history from '../../history'

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
		<div className={s.auth}>
			<h1 className={s.header}>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
			<AuthForm onsubmit={onSubmit} isSignup={isSignup}/>
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