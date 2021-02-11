import React from 'react'
import Menu from 'antd/lib/menu'
import {getIsAuthSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
	CommentOutlined,
	DislikeOutlined,
	FormOutlined,
	HomeOutlined,
	LikeOutlined,
	LoginOutlined,
	TagsOutlined,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons'
import history from '../../history'
import Affix from 'antd/lib/affix'
import MenuItem from './MenuItem'

const LeftMenu = ({isAuth, location}) => {
	const option = location.pathname.split('/')[1] || 'home'

	const handleClick = e => {
		history.push(`/${e.key === 'home' ? '' : e.key}`)
	}

	return (
		<Affix offsetTop={105}>
			<Menu mode='inline' defaultSelectedKeys={['home']} selectedKeys={[option]} onClick={handleClick}>
				<MenuItem key='home' title='Home' icon={<HomeOutlined/>} isAuth={isAuth} forAll available/>
				<MenuItem key='my' title='My Posts' icon={<UserOutlined/>} isAuth={isAuth} available/>
				<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} isAuth={isAuth} available/>
				<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>} isAuth={isAuth} available/>
				<MenuItem key='by-categories' title='By Categories' icon={<TagsOutlined/>}/>
				<MenuItem key='user' title='User Posts' icon={<TeamOutlined/>}/>
				<MenuItem key='post' title='Comments' icon={<CommentOutlined/>}/>
				<MenuItem key='auth/signin' title='Authorization' icon={<LoginOutlined/>} forAll available/>
				<MenuItem key='create' title='Create Post' icon={<FormOutlined/>} isAuth={isAuth} available/>
			</Menu>
		</Affix>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftMenu))