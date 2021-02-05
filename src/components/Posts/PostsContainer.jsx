import React from 'react'
import {getPostsSelector} from '../../redux/posts-selectors'
import {requestPosts, setRating} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import Posts from './Posts'
import {getIsAuthSelector} from '../../redux/auth-selectors'

class PostsContainer extends React.Component {
	componentDidMount() {
		this.props.getPosts()
	}

	render = () => (
		<Posts posts={this.props.posts} setRating={this.props.setRating} isAuth={this.props.isAuth}/>
	)
}

const mapStateToProps = state => ({
	posts: getPostsSelector(state),
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	getPosts: requestPosts,
	setRating
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)