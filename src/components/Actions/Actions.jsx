import React from 'react'
import {Button, Tooltip} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const Actions = ({isAuth}) => {
	const button = (
		<Link className='addPost' to='/create'>
			<Button type='primary' icon={<PlusOutlined/>} disabled={!isAuth}>
				Add post
			</Button>
		</Link>
	)

	return isAuth ? button :
		<Tooltip title='Only for authorized users.' placement='bottom'>
			{button}
		</Tooltip>
}

export default Actions