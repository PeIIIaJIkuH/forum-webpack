import React from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {isAuthSelector, urlToSelector} from '../../redux/selectors'
import AuthForm from './AuthForm'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import history from '../../history'
import Error403 from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {setUrlTo} from '../../redux/app-reducer'
import {notificationType, openNotification} from '../../utils/helpers/helpers'

const Auth = ({signup, signin, isAuth, register, urlTo, setUrlTo}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	if (isAuth) return <Error403 text='Sorry, you are authorized, you have no access to the authorization page.'/>

	const onSubmit = async ({username, email, password}) => {
		setIsFetching(true)
		if (register) {
			const ok = await signup(username, email, password)
			setIsFetching(false)
			if (ok) {
				openNotification(notificationType.SUCCESS, 'Created new user!')
				form.resetFields()
				history.push('/auth/signin')
			} else {
				openNotification(notificationType.ERROR, 'Can not register!')
			}
		} else {
			const ok = await signin(username, password)
			setIsFetching(false)
			if (ok) {
				if (urlTo) {
					await setUrlTo(null)
					history.push(urlTo)
				} else {
					history.push('/')
				}
			} else {
				openNotification(notificationType.ERROR, 'Can not login!')
			}
		}
	}

	const onClick = () => {
		form.resetFields()
	}

	const title = register ? 'Sign Up' : 'Sign In',
		path = register ? '/auth/signin' : '/auth/signup',
		extra = (
			<Link to={path} onClick={onClick}>
				{!register ? 'Sign Up' : 'Sign In'}
			</Link>
		)

	return (
		<>
			<Helmet><title>{title} | forume</title></Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title={title}
					  extra={extra}>
					<AuthForm onsubmit={onSubmit} isSignup={register} form={form} isFetching={isFetching}/>
				</Card>
			</div>
		</>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	urlTo: urlToSelector(state)
})

const mapDispatchToProps = {
	signup,
	signin,
	setUrlTo
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)