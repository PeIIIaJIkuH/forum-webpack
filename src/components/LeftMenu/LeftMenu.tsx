import React, {FC, useState} from 'react'
import Menu from 'antd/lib/menu'
import {useHistory, useLocation} from 'react-router-dom'
import {DislikeOutlined, FormOutlined, HomeOutlined, LikeOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import {MenuItem} from './MenuItem'
import {CategoriesModal} from './CategoriesModal'
import {observer} from 'mobx-react-lite'
import authState from '../../store/authState'

type Props = {
	mobile?: boolean
}

export const LeftMenu: FC<Props> = observer(({mobile}) => {
	const location = useLocation(),
		history = useHistory(),
		options = [location.pathname.split('/')[1] || 'home'],
		[modalVisible, setModalVisible] = useState(false),
		defaultKeys = ['home']

	const onClick = ({key}: any) => {
		if (key !== 'by-categories') {
			history.push(`/${key === 'home' ? '' : key}`)
		} else {
			setModalVisible(true)
		}
	}

	return (
		<Menu mode='inline' defaultSelectedKeys={defaultKeys} selectedKeys={options} onClick={onClick}>
			<MenuItem key='home' title='Home' icon={<HomeOutlined/>} isAuth={!!authState.user} forAll available/>
			<MenuItem key='my' title='My Posts' icon={<UserOutlined/>} isAuth={!!authState.user} available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} isAuth={!!authState.user} available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={
				<DislikeOutlined/>} isAuth={!!authState.user} available
			/>
			{mobile && <>
				<MenuItem key='by-categories' title='By Categories' icon={<TagsOutlined/>} available forAll={mobile}/>
				<CategoriesModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
				<MenuItem key='create' title='Create Post' icon={<FormOutlined/>} forAll={mobile} available={mobile}/>
			</>}
		</Menu>
	)
})
