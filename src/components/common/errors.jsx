import React from 'react'
import Button from 'antd/lib/button'
import Result from 'antd/lib/result'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

export const Error404 = () => (
	<>
		<Helmet><title>Error 404 | forume</title></Helmet>
		<Result status='404' title='404' subTitle='Sorry, the page you visited does not exist.'
				extra={<Link to='/'><Button type='primary'>Back Home</Button></Link>}
		/>
	</>
)

export const Error403 = () => (
	<>
		<Helmet><title>Error 403 | forume</title></Helmet>
		<Result status='403' title='403' subTitle='Sorry, you are not authorized to access this page.'
				extra={<Link to='/'><Button type='primary'>Back Home</Button></Link>}
		/>
	</>
)