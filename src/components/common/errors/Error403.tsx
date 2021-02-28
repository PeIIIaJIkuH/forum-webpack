import React, {FC} from 'react'
import Button from 'antd/lib/button'
import Result from 'antd/lib/result'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {SetUrlTo, setUrlTo} from '../../../redux/app-reducer'
import {State} from '../../../redux/store'

type OwnProps = {
	text?: string
}

type Props = OwnProps & MapStateToProps & MapDispatchToProps & RouteComponentProps

const Error403: FC<Props> = ({text, setUrlTo, location}) => {
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

type MapStateToProps = {}
const mapStateToProps = (state: State): MapStateToProps => ({})

type MapDispatchToProps = {
	setUrlTo: SetUrlTo
}
const mapDispatchToProps: MapDispatchToProps = {
	setUrlTo
}

export default connect<MapStateToProps, MapDispatchToProps, unknown, State>(mapStateToProps, mapDispatchToProps)(withRouter(Error403))