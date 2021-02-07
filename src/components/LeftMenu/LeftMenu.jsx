import React from 'react'
import Menu from 'antd/lib/menu'
import Tooltip from 'antd/lib/tooltip'
import {getIsAuthSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {DislikeOutlined, HomeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import history from '../../history'
import Affix from 'antd/lib/affix'

const LeftMenu = ({isAuth, location}) => {
	const option = location.pathname.split('/')[1] || 'home'

	const handleClick = e => {
		history.push(`/${e.key === 'home' ? '' : e.key}`)
	}

	const my = <div><UserOutlined/>My Posts</div>,
		upVoted = <div><LikeOutlined/>Upvoted Posts</div>,
		downVoted = <div><DislikeOutlined/>Downvoted Posts</div>

	return (
		<Affix offsetTop={105}>
			<Menu mode='inline' defaultSelectedKeys={['home']} selectedKeys={[option]} onClick={handleClick}>
				<Menu.Item key='home' icon={<HomeOutlined/>}>Home</Menu.Item>
				<Menu.Item key='my' disabled={!isAuth}>
					{isAuth ? my :
						<Tooltip title='Only for authorized users.' placement='right'>
							{my}
						</Tooltip>
					}
				</Menu.Item>
				<Menu.Item key='up-voted' disabled={!isAuth}>
					{isAuth ? upVoted :
						<Tooltip title='Only for authorized users.' placement='right'>
							{upVoted}
						</Tooltip>
					}
				</Menu.Item>
				<Menu.Item key='down-voted' disabled={!isAuth}>
					{isAuth ? downVoted :
						<Tooltip title='Only for authorized users.' placement='right'>
							{downVoted}
						</Tooltip>
					}
				</Menu.Item>
			</Menu>
		</Affix>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftMenu))