import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {getIsAuthSelector} from '../../redux/selectors'
import AuthForm from './AuthForm'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import history from '../../history'
import {Error403} from '../common/errors'
import {Helmet} from 'react-helmet'

const Auth = ({signup, signin, isAuth, isSignup}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	const onSubmit = async ({signInUsername, signInPassword, signUpUsername, signUpEmail, signUpPassword}) => {
		setIsFetching(true)
		if (isSignup) {
			await signup(signUpUsername, signUpEmail, signUpPassword)
			setIsFetching(false)
			history.push('/signin')
		} else {
			await signin(signInUsername, signInPassword)
			setIsFetching(false)
			history.push('/')
		}
	}

	if (isAuth) return <Error403/>

	return (
		<>
			<Helmet><title>{isSignup ? 'Sign Up' : 'Sign In'} | forume</title></Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title={isSignup ? 'Sign Up' : 'Sign In'}
					  extra={(
						  <Link to={isSignup ? '/signin' : '/signup'} onClick={() => {
							  form.resetFields()
						  }}>
							  {isSignup ? 'Sign In' : 'Sign Up'}
						  </Link>
					  )}>
					<AuthForm onsubmit={onSubmit} isSignup={isSignup} form={form} isFetching={isFetching}/>
				</Card>
			</div>
		</>
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