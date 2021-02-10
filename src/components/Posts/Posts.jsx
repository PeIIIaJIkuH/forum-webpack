import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector, getUserIDSelector} from '../../redux/selectors'
import {
	requestAllPosts,
	requestComments,
	requestPostsByCategories,
	requestRatedPosts,
	requestUserPosts,
	setRating
} from '../../redux/posts-reducer'
import Post from './Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {withRouter} from 'react-router-dom'
import {Error404} from '../common/errors'
import {Helmet} from 'react-helmet'

const Posts = ({type, posts, ...props}) => {
	const urlId = props.match.params.id,
		[title, setTitle] = React.useState('Home')

	React.useEffect(() => {
		if (type === 'my') {
			setTitle('My Posts')
			props.requestUserPosts(props.userID)
		} else if (type === 'user') {
			setTitle('user')
			props.requestUserPosts(props.match.params.id)
		} else if (type === 'upvoted' || type === 'downvoted') {
			setTitle(type === 'upvoted' ? 'Upvoted Posts' : 'Downvoted Posts')
			props.requestRatedPosts(type)
		} else if (type === 'categories') {
			setTitle('Search by Categories')
			props.requestPostsByCategories()
		} else {
			props.requestAllPosts()
		}
	}, [type, props.match.params.id])

	if (urlId !== undefined && isNaN(+urlId)) return <Error404/>

	return (
		<>
			<Helmet><title>{title} | forume</title></Helmet>
			<section className='posts'>
				{posts ?
					posts.map((post, i) => (
						<Post post={post} key={i} {...props}/>
					)) :
					<Card><Empty/></Card>
				}
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	posts: getPostsSelector(state),
	userID: getUserIDSelector(state),
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	requestAllPosts,
	requestUserPosts,
	requestRatedPosts,
	requestPostsByCategories,
	setRating,
	requestComments
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts))