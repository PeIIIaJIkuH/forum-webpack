import React from 'react'
import Button from 'antd/lib/button'
import Result from 'antd/lib/result'
import {Link, withRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {setUrlTo} from '../../../redux/app-reducer'

const Error403 = ({text, setUrlTo, location}) => {
	const onClick = async () => {
		await setUrlTo(location.pathname)
	}

	return (
		<>
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
	)
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
	setUrlTo
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Error403))