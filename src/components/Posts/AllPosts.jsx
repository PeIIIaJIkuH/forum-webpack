import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {withRouter} from 'react-router-dom'
import {requestPosts, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'

class AllPosts extends React.Component {
	async componentDidMount() {
		await this.props.requestPosts()
	}

	render() {
		return (
			<Posts posts={this.props.posts} setRating={this.props.setRating} isAuth={this.props.isAuth}/>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	posts: getPostsSelector(state)
})

const mapDispatchToProps = {
	setRating,
	requestPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)