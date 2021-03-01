import React, {FC, useState} from 'react'
import s from './Auth.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {signin, signup} from '../../redux/auth-reducer'
import {isAuthSelector, urlToSelector} from '../../redux/selectors'
import {AuthForm} from './AuthForm'
import Card from 'antd/lib/card'
import {history} from '../../history/history'
import {Error403} from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {setUrlTo} from '../../redux/app-reducer'
import message from 'antd/lib/message'
import {useForm} from 'antd/lib/form/Form'

type Props = {
	register?: boolean
}

export const Auth: FC<Props> = ({register}) => {
	const isAuth = useSelector(isAuthSelector),
		urlTo = useSelector(urlToSelector)

	const dispatch = useDispatch()

	const [form] = useForm()
	const [isFetching, setIsFetching] = useState(false)

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
			const ok: any = dispatch(signup(username, email, password))
			setIsFetching(false)
			if (ok) {
				message.success('Created new user!')
				form.resetFields()
				history.push('/auth/signin')
			} else
				message.error('Can not register!')
		} else {
			const ok: any = dispatch(signin(username, password))
			setIsFetching(false)
			if (ok) {
				if (urlTo) {
					await dispatch(setUrlTo(null))
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
				<AuthForm onsubmit={onSubmit} register={register} form={form} isFetching={isFetching}/>
			</Card>
		</div>
	</>
}
