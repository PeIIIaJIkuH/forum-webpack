import React from 'react'
import Button from 'antd/lib/button'
import Result from 'antd/lib/result'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

const Error403 = ({text}) => {
	return (
		<>
			<Helmet><title>Error 403 | forume</title></Helmet>
			<Result status='403' title='403' subTitle={text || 'Sorry, you are not authorized to access this page.'}
					extra={(
						<Link to='/'>
							<Button type={'primary'}>Back Home</Button>
						</Link>
					)}
			/>
		</>
	)
}

export default Error403