import React from 'react'
import {getIsAuthSelector, getPostsSelector, getUserIDSelector, getUserSelector} from '../../redux/selectors'
import {requestPostsByCategories, requestUser, requestUserPosts, setRating} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserInfo from './UserInfo'
import {Helmet} from 'react-helmet'
import Post from '../Posts/Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {Error404} from '../common/errors'

const User = ({
				  user, match, requestUser, requestUserPosts, posts, isAuth, requestPostsByCategories, userID,
				  setRating
			  }) => {
	const urlId = match.params.id

	React.useEffect(() => {
		requestUser(urlId)
		requestUserPosts(+urlId)
	}, [requestUser, requestUserPosts, urlId])

	if (urlId !== undefined && isNaN(+urlId)) return <Error404/>

	return (
		<>
			<Helmet><title>{user ? user.username : 'User Page'} | forume</title></Helmet>
			<UserInfo user={user}/>
			<section className='posts'>
				{posts ?
					posts.map((post, i) => (
						<Post post={post} key={i} isAuth={isAuth} requestPostsByCategories={requestPostsByCategories}
							  userID={userID} setRating={setRating}/>
					)) :
					<Card><Empty/></Card>
				}
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	user: getUserSelector(state),
	isAuth: getIsAuthSelector(state),
	userID: getUserIDSelector(state),
	posts: getPostsSelector(state)
})

const mapDispatchToProps = {
	requestUser,
	requestUserPosts,
	requestPostsByCategories,
	setRating
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))