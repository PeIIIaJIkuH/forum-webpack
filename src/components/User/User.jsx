import React from 'react'
import s from './User.module.css'
import {postsSelector, userCommentsSelector, userSelector} from '../../redux/selectors'
import {requestCommentedPosts, requestRatedPosts, requestUser, requestUserPosts} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserInfo from './UserInfo'
import {Helmet} from 'react-helmet'
import Post from '../Posts/Post/Post'
import Error404 from '../common/errors/Error404'
import Menu from 'antd/lib/menu'
import MenuItem from '../LeftMenu/MenuItem'
import {CommentOutlined, DislikeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'

const User = ({
				  user, match, requestUser, requestUserPosts, posts, requestRatedPosts, requestCommentedPosts,
				  userComments
			  }) => {
	const urlId = match.params.id,
		[check, setCheck] = React.useState(true)

	React.useEffect(() => {
		const initialize = async () => {
			const check = await requestUser(urlId)
			if (!check) {
				setCheck(false)
			}
			requestUserPosts(+urlId)
		}
		initialize()
	}, [urlId, requestUser, requestUserPosts])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) return <Error404/>

	const onClick = e => {
		if (e.key === 'created') {
			requestUserPosts(+urlId)
		} else if (e.key === 'up-voted') {
			requestRatedPosts(+urlId, 'upvoted')
		} else if (e.key === 'down-voted') {
			requestRatedPosts(+urlId, 'downvoted')
		} else {
			requestCommentedPosts(+urlId)
		}
	}

	const title = user ? user.username : 'User Page',
		defaultKeys = ['created'],
		postCards = posts && posts.map((post, i) => (
			<Post post={post} key={i} comments={userComments && userComments[post.id]}/>
		))

	return user && (
		<>
			<Helmet><title>{title} | forume</title></Helmet>
			<UserInfo user={user}/>
			<Menu className={s.menu} mode='horizontal' defaultSelectedKeys={defaultKeys} onClick={onClick}>
				<MenuItem className={s.menuItem} key='created' title='Created Posts' icon={<UserOutlined/>} forAll
						  available/>
				<MenuItem className={s.menuItem} key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} forAll
						  available/>
				<MenuItem className={s.menuItem} key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>}
						  forAll available/>
				<MenuItem className={s.menuItem} key='commented' title='Commented Posts' icon={<CommentOutlined/>}
						  forAll available/>
			</Menu>
			<section className='posts'>
				{posts && posts.length ? postCards :
					<Card className={s.emptyCard}><Empty description='No Posts'/></Card>}
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	user: userSelector(state),
	posts: postsSelector(state),
	userComments: userCommentsSelector(state)
})

const mapDispatchToProps = {
	requestUser,
	requestUserPosts,
	requestRatedPosts,
	requestCommentedPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))