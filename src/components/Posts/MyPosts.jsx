import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector, getUserIDSelector} from '../../redux/selectors'
import {requestPostsByCategories, requestUserPosts, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import {Error403} from '../common/errors'
import {Helmet} from 'react-helmet'

class MyPosts extends React.Component {
	async componentDidMount() {
		const userID = this.props.userID
		await this.props.requestUserPosts(userID)
	}

	render() {
		const {posts, setRating, isAuth, requestPostsByCategories} = this.props,
			props = {posts, setRating, isAuth, requestPostsByCategories}

		if (!isAuth) return <Error403/>

		return (
			<>
				<Helmet><title>My Posts | forume</title></Helmet>
				<Posts {...props}/>
			</>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	posts: getPostsSelector(state),
	userID: getUserIDSelector(state)
})

const mapDispatchToProps = {
	requestUserPosts,
	setRating,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)