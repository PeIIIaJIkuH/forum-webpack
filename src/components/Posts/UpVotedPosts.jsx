import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestPostsByCategories, requestRatedPosts, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import {Error403} from '../common/errors'

class UpVotedPosts extends React.Component {
	async componentDidMount() {
		await this.props.requestRatedPosts('upvoted')
	}

	render() {
		if (!this.props.isAuth) return <Error403/>

		return (
			<Posts posts={this.props.posts} setRating={this.props.setRating} isAuth={this.props.isAuth}
				   requestPostsByCategories={this.props.requestPostsByCategories}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpVotedPosts)