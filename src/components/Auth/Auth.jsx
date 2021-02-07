import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {getIsAuthSelector} from '../../redux/selectors'
import AuthForm from './AuthForm'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'

const Auth = ({signup, signin, isAuth, isSignup}) => {
	const [form] = Form.useForm()

	const onSubmit = ({signInUsername, signInPassword, signUpUsername, signUpEmail, signUpPassword}) => {
		if (isSignup) {
			signup(signUpUsername, signUpEmail, signUpPassword)
		} else {
			signin(signInUsername, signInPassword)
		}
	}

	if (isAuth) return <Redirect to='/'/>

	return (
		<div className={s.wrapper}>
			<Card className={s.card} title={isSignup ? 'Sign Up' : 'Sign In'}
				  extra={(
					  <Link to={isSignup ? '/signin' : '/signup'} onClick={() => {
						  form.resetFields()
					  }}>
						  {isSignup ? 'Sign In' : 'Sign Up'}
					  </Link>
				  )}>
				<AuthForm onsubmit={onSubmit} isSignup={isSignup} form={form}/>
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