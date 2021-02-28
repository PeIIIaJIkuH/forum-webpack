import React, {FC} from 'react'
import s from './Auth.module.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Signin, signin, Signup, signup} from '../../redux/auth-reducer'
import {isAuthSelector, urlToSelector} from '../../redux/selectors'
import AuthForm from './AuthForm'
import Card from 'antd/lib/card'
import Form from 'antd/lib/form'
import history from '../../history'
import Error403 from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {SetUrlTo, setUrlTo} from '../../redux/app-reducer'
import {State} from '../../redux/store'
import message from 'antd/lib/message'

type OwnProps = {
	register?: boolean
}
type Props = MapStateToProps & MapDispatchToProps & OwnProps

const Auth: FC<Props> = ({signup, signin, isAuth, register, urlTo, setUrlTo}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	if (isAuth)
		return <Error403 text='Sorry, you are authorized, you have no access to the authorization page.'/>

	type obj = {
		username: string
		email: string
		password: string
	}
	const onSubmit = async ({username, email, password}: obj) => {
		setIsFetching(true)
		if (register) {
			const ok: any = await signup(username, email, password)
			setIsFetching(false)
			if (ok) {
				message.success('Created new user!')
				form.resetFields()
				history.push('/auth/signin')
			} else
				message.error('Can not register!')
		} else {
			const ok: any = await signin(username, password)
			setIsFetching(false)
			if (ok) {
				if (urlTo) {
					await setUrlTo(null)
					history.push(urlTo)
				} else
					history.push('/')
			} else message.error('Can not login!')
		}
	}

	const onClick = () => {
		form.resetFields()
	}

	const title = register ? 'Sign Up' : 'Sign In',
		path = register ? '/auth/signin' : '/auth/signup',
		extra = <>
			<Link to={path} onClick={onClick}>
				{!register ? 'Sign Up' : 'Sign In'}
			</Link>
		</>

	return <>
		<Helmet><title>{title} | forume</title></Helmet>
		<div className={s.wrapper}>
			<Card className={s.card} title={title} extra={extra}>
				<AuthForm onsubmit={onSubmit} isSignup={register} form={form} isFetching={isFetching}/>
			</Card>
		</div>
	</>
}

type MapStateToProps = {
	isAuth: boolean
	urlTo: string | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state),
	urlTo: urlToSelector(state)
})

type MapDispatchToProps = {
	signup: Signup
	signin: Signin
	setUrlTo: SetUrlTo
}
const mapDispatchToProps: MapDispatchToProps = {
	signup,
	signin,
	setUrlTo
}

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, State>(mapStateToProps, mapDispatchToProps)(Auth)