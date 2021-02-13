import React from 'react'
import {connect} from 'react-redux'
import {isAuthSelector, postsSelector, userIDSelector} from '../../redux/selectors'
import {requestAllPosts, requestPostsByCategories, requestRatedPosts, requestUserPosts} from '../../redux/posts-reducer'
import Post from './Post/Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {withRouter} from 'react-router-dom'
import Error404 from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import Error403 from '../common/errors/Error403'

const Posts = ({
				   type, posts, match, userID, requestUserPosts, requestRatedPosts, requestPostsByCategories,
				   requestAllPosts, isAuth
			   }) => {
	const urlId = match.params.id,
		[title, setTitle] = React.useState('Home')

	React.useEffect(() => {
		if (type === 'my') {
			setTitle('My Posts')
			requestUserPosts(userID)
		} else if (type === 'user') {
			setTitle('user')
			requestUserPosts(urlId)
		} else if (type === 'upvoted' || type === 'downvoted') {
			setTitle(type === 'upvoted' ? 'Upvoted Posts' : 'Downvoted Posts')
			requestRatedPosts(userID, type)
		} else if (type === 'categories') {
			setTitle('Search by Categories')
			requestPostsByCategories()
		} else {
			setTitle('Home')
			requestAllPosts()
		}
	}, [type, urlId, requestUserPosts, requestRatedPosts, requestPostsByCategories,
		requestAllPosts, userID])

	if (urlId !== undefined && isNaN(+urlId)) return <Error404/>
	if (!isAuth && (type === 'my' || type === 'upvoted' || type === 'downvoted')) return <Error403/>

	const postCards = posts && posts.map((post, i) => (
		<Post post={post} key={i}/>
	))

	return (
		<>
			<Helmet><title>{title} | forume</title></Helmet>
			<section className='posts'>
				{posts ?
					postCards :
					<Card>
						<Empty description='No Posts'/>
					</Card>
				}
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	posts: postsSelector(state),
	userID: userIDSelector(state),
	isAuth: isAuthSelector(state)
})

const mapDispatchToProps = {
	requestAllPosts,
	requestUserPosts,
	requestRatedPosts,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts))