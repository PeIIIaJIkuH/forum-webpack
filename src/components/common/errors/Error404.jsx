import {Helmet} from 'react-helmet'
import Result from 'antd/lib/result'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'

export const Error404 = ({text}) => {
	const extra = <Link to='/'><Button type='primary'>Back Home</Button></Link>,
		subTitle = text || 'Sorry, the page you visited does not exist.'

	return (
		<>
			<Helmet><title>Error 404 | forume</title></Helmet>
			<Result status='404' title='404' subTitle={subTitle}
					extra={extra}
			/>
		</>
	)
}

export default Error404