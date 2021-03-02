import React, {FC} from 'react'
import Button from 'antd/lib/button'
import Result from 'antd/lib/result'
import {Link, useLocation} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {useDispatch} from 'react-redux'
import {setUrlTo} from '../../../redux/app-reducer'

type Props = {
	text?: string
}

export const Error403: FC<Props> = ({text}) => {
	const location = useLocation()

	const dispatch = useDispatch()

	const onClick = async () => {
		await dispatch(setUrlTo(location.pathname))
	}

	return <>
		<Helmet><title>Error 403 | forume</title></Helmet>
		<Result status='403' title='403' subTitle={text || 'Sorry, you are not authorized to access this page.'}
				extra={(
					<>
						<Link to='/'>
							<Button type={text ? 'primary' : 'default'}>Back Home</Button>
						</Link>
						{!text &&
						<Link to='/auth/signin'>
							<Button type='primary' onClick={onClick}>Authorize</Button>
						</Link>}
					</>
				)}
		/>
	</>
}