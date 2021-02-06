import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector, getUserIDSelector} from '../../redux/selectors'
import {requestUserPosts, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import {Error403} from '../common/errors'

class MyPosts extends React.Component {
	async componentDidMount() {
		const userID = this.props.userID
		await this.props.requestUserPosts(userID)
	}

	render() {
		if (!this.props.isAuth) return <Error403/>

		return (
			<Posts posts={this.props.posts} setRating={this.props.setRating} isAuth={this.props.isAuth}/>
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
	setRating
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)