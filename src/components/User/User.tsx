import React, {FC, useEffect, useState} from 'react'
import s from './User.module.css'
import {useRouteMatch} from 'react-router-dom'
import {UserInfo} from './UserInfo'
import {Helmet} from 'react-helmet'
import {Error404} from '../common/errors/Error404'
import Menu from 'antd/lib/menu'
import {MenuItem} from '../LeftMenu/MenuItem'
import {CommentOutlined, DislikeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import {Posts} from '../Posts/Posts'
import userState from '../../store/userState'
import postsState from '../../store/postsState'
import commentsState from '../../store/commentsState'
import {observer} from 'mobx-react-lite'

export const User: FC = observer(() => {
	const match = useRouteMatch<{ id: string }>(),
		urlId = match.params.id,
		[check, setCheck] = useState(true),
		title = userState.user?.username || 'User Page'

	useEffect(() => {
		const f = async () => {
			const status = await userState.fetchUser(+urlId)
			if (!status) {
				setCheck(false)
			}
			await postsState.fetchUserPosts(+urlId)
		}
		f().then()
	}, [urlId])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) {
		return <Error404/>
	}

	const onClick = ({key}: any) => {
		if (key === 'created') {
			postsState.fetchUserPosts(+urlId).then()
		} else if (key === 'up-voted') {
			postsState.fetchRatedPosts(+urlId, true).then()
		} else if (key === 'down-voted') {
			postsState.fetchRatedPosts(+urlId, false).then()
		} else {
			postsState.fetchCommentedPosts(+urlId).then()
		}
	}

	return userState.user && <>
		<Helmet><title>{title} | forume</title></Helmet>
		<UserInfo/>
		<Menu className={s.menu} mode='horizontal' defaultSelectedKeys={['created']} onClick={onClick}>
			<MenuItem key='created' title='Created Posts' icon={<UserOutlined/>} forAll available/>
			<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} forAll available/>
			<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>} forAll available/>
			<MenuItem key='commented' title='Commented Posts' icon={<CommentOutlined/>} forAll available/>
		</Menu>
		<Posts userComments={commentsState.userComments}/>
	</>
})
