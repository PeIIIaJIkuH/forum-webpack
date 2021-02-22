import React, {FC} from 'react'
import s from './User.module.css'
import {postsSelector, userCommentsSelector, userSelector} from '../../redux/selectors'
import {
	RequestCommentedPosts,
	requestCommentedPosts,
	RequestRatedPosts,
	requestRatedPosts,
	RequestUser,
	requestUser,
	RequestUserPosts,
	requestUserPosts
} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import UserInfo from './UserInfo'
import {Helmet} from 'react-helmet'
import Error404 from '../common/errors/Error404'
import Menu from 'antd/lib/menu'
import MenuItem from '../LeftMenu/MenuItem'
import {CommentOutlined, DislikeOutlined, LikeOutlined, UserOutlined} from '@ant-design/icons'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {State} from '../../redux/store'
import {TComment, TPost, TUser} from '../../types/types'
import Post from '../Posts/Post/Post'

type PathParamsType = {
	id: string
}

type OwnProps = RouteComponentProps<PathParamsType>

type Props = MapStateToProps & MapDispatchToProps & OwnProps & RouteComponentProps

const User: FC<Props> = ({
							 user, match, requestUser, requestUserPosts, posts,
							 requestRatedPosts, requestCommentedPosts, userComments
						 }) => {
	const urlId = match.params.id,
		[check, setCheck] = React.useState(true)

	React.useEffect(() => {
		const initialize = async () => {
			const ok: any = await requestUser(+urlId)
			if (!ok) {
				setCheck(false)
			}
			requestUserPosts(+urlId)
		}
		initialize()
	}, [urlId, requestUser, requestUserPosts])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) return <Error404/>

	const onClick = ({key}: any) => {
		if (key === 'created') {
			requestUserPosts(+urlId)
		} else if (key === 'up-voted') {
			requestRatedPosts(+urlId, 'upvoted')
		} else if (key === 'down-voted') {
			requestRatedPosts(+urlId, 'downvoted')
		} else {
			requestCommentedPosts(+urlId)
		}
	}

	const title = user ? user.username : 'User Page',
		defaultKeys = ['created'],
		postCards = posts && posts.map(post => (
			<Post post={post} key={post.id} comments={userComments && userComments[post.id]}/>
		))

	return user && (
		<>
			<Helmet><title>{title} | forume</title></Helmet>
			<UserInfo user={user}/>
			<Menu className={s.menu} mode='horizontal' defaultSelectedKeys={defaultKeys} onClick={onClick}>
				<MenuItem key='created' title='Created Posts' icon={<UserOutlined/>} forAll
						  available/>
				<MenuItem key='up-voted' title='Upvoted Posts' icon={<LikeOutlined/>} forAll
						  available/>
				<MenuItem key='down-voted' title='Downvoted Posts' icon={<DislikeOutlined/>}
						  forAll available/>
				<MenuItem key='commented' title='Commented Posts' icon={<CommentOutlined/>}
						  forAll available/>
			</Menu>
			<section className='posts'>
				{posts && posts.length ? postCards :
					<Card><Empty description='No Posts'/></Card>}
			</section>
		</>
	)
}

type MapStateToProps = {
	user: TUser | null
	posts: TPost[] | null
	userComments: { [key: string]: TComment[] } | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	user: userSelector(state),
	posts: postsSelector(state),
	userComments: userCommentsSelector(state)
})

type MapDispatchToProps = {
	requestUser: RequestUser
	requestUserPosts: RequestUserPosts
	requestRatedPosts: RequestRatedPosts
	requestCommentedPosts: RequestCommentedPosts
}
const mapDispatchToProps: MapDispatchToProps = {
	requestUser,
	requestUserPosts,
	requestRatedPosts,
	requestCommentedPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))