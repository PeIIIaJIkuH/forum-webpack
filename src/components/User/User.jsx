import React from 'react'
import {getPostsSelector, userSelector} from '../../redux/selectors'
import {requestUser, requestUserPosts} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserInfo from './UserInfo'
import {Helmet} from 'react-helmet'
import Post from '../Posts/Post/Post'
import Error404 from '../common/errors/Error404'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'

const User = ({user, match, requestUser, requestUserPosts, posts}) => {
	const urlId = match.params.id,
		[check, setCheck] = React.useState(false)

	React.useEffect(() => {
		const initialize = async () => {
			const check = await requestUser(urlId)
			requestUserPosts(+urlId)
			if (check) {
				setCheck(true)
			}
		}
		initialize()
	}, [requestUser, requestUserPosts, urlId])

	if ((urlId !== undefined && isNaN(+urlId)) || !check) return <Error404/>

	return (
		<>
			<Helmet><title>{user ? user.username : 'User Page'} | forume</title></Helmet>
			<UserInfo user={user}/>
			<section className='posts'>
				{posts ? posts.map((post, i) => (
					<Post post={post} key={i}/>
				)) : <Card><Empty description='No Posts'/></Card>}
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	user: userSelector(state),
	posts: getPostsSelector(state)
})

const mapDispatchToProps = {
	requestUser,
	requestUserPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))