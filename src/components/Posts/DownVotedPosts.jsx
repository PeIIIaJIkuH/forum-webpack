import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestPostsByCategories, requestRatedPosts, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import {Error403} from '../common/errors'
import {Helmet} from 'react-helmet'

class DownVotedPosts extends React.Component {
	async componentDidMount() {
		await this.props.requestRatedPosts('downvoted')
	}

	render() {
		const {posts, setRating, isAuth, requestPostsByCategories} = this.props,
			props = {posts, setRating, isAuth, requestPostsByCategories}

		if (!isAuth) return <Error403/>

		return (
			<>
				<Helmet><title>Downvoted Posts | forume</title></Helmet>
				<Posts {...props}/>
			</>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	posts: getPostsSelector(state)
})

const mapDispatchToProps = {
	setRating,
	requestRatedPosts,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(DownVotedPosts)