import React from 'react'
import {getPostsSelector} from '../../redux/posts-selectors'
import {requestPosts} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import Posts from './Posts'

class PostsContainer extends React.Component {
	componentDidMount() {
		this.props.getPosts()
	}

	render = () => (
		<Posts/>
	)
}

const mapStateToProps = state => ({
	posts: getPostsSelector(state)
})

const mapDispatchToProps = {
	getPosts: requestPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)