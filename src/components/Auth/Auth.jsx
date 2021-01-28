import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signin, signout, signup} from '../../redux/auth-reducer'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import AuthForm from './AuthForm'

const Auth = ({signup, signin, isAuth, isSignup}) => {
	const onSubmit = ({username, email, password}) => {
		if (isSignup) {
			signup(username, email, password)
		} else {
			signin(username, password)
		}
	}

	if (isAuth) return <Redirect to='/'/>

	return (
		<div className={s.auth}>
			<h1 className={s.header}>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
			<AuthForm onsubmit={onSubmit} isSignup={isSignup}/>
			<button onClick={signout}>Sign Out</button>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {signup, signin, signout}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)