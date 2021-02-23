import React, {FC} from 'react'
import Menu from 'antd/lib/menu'
import {isAuthSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {DislikeOutlined, FormOutlined, HomeOutlined, LikeOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import history from '../../history'
import MenuItem from './MenuItem'
import CategoriesModal from './CategoriesModal'
import {State} from '../../redux/store'

type OwnProps = {
	mobile?: boolean
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps & RouteComponentProps

const LeftMenu: FC<Props> = ({isAuth, location, mobile}) => {
	const options = [location.pathname.split('/')[1] || 'home'],
		defaultKeys = ['home'],
		[modalVisible, setModalVisible] = React.useState(false)

	const onClick = ({key}: any) => {
		if (key !== 'by-categories') {
			history.push(`/${key === 'home' ? '' : key}`)
		} else {
			setModalVisible(true)
		}
	}

	return (
		<Menu mode='inline' defaultSelectedKeys={defaultKeys} selectedKeys={options} onClick={onClick}>
			<MenuItem key='home' title='Home' icon={<HomeOutlined/>} isAuth={isAuth} forAll available/>
			<MenuItem key='my' title='My Posts' icon={<UserOutlined/>} isAuth={isAuth} available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} isAuth={isAuth} available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>} isAuth={isAuth} available/>
			{mobile && <>
				<MenuItem key='by-categories' title='By Categories' icon={<TagsOutlined/>} available forAll={mobile}/>
				<CategoriesModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
				<MenuItem key='create' title='Create Post' icon={<FormOutlined/>} forAll={mobile} available={mobile}/>
			</>}
		</Menu>
	)
}

type MapStateToProps = {
	isAuth: boolean
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state)
})

type MapDispatchToProps = {}
const mapDispatchToProps: MapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftMenu))