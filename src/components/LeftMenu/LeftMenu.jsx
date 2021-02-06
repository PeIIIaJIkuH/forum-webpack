import React from 'react'
import {Menu} from 'antd'
import {getIsAuthSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {DislikeOutlined, HomeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import history from '../../history'

const LeftMenu = ({isAuth, location}) => {
	const option = location.pathname.split('/')[1] || 'home'

	const handleClick = e => {
		history.push(`/${e.key === 'home' ? '' : e.key}`)
	}

	return (
		<Menu mode='inline' defaultSelectedKeys={['home']} selectedKeys={[option]} onClick={handleClick}>
			<Menu.Item key='home' icon={<HomeOutlined/>}>Home</Menu.Item>
			<Menu.Item key='my' disabled={!isAuth} icon={<UserOutlined/>}>My Posts</Menu.Item>
			<Menu.Item key='upvoted' disabled={!isAuth} icon={<LikeOutlined/>}>Upvoted Posts</Menu.Item>
			<Menu.Item key='downvoted' disabled={!isAuth} icon={<DislikeOutlined/>}>Downvoted Posts</Menu.Item>
		</Menu>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftMenu))