import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {withRouter} from 'react-router-dom'
import {requestPostsByCategories, requestUserPosts, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'

class UserPosts extends React.Component {
	async componentDidMount() {
		const id = this.props.match.params.id
		await this.props.requestUserPosts(id)
	}

	render() {
		const {posts, setRating, isAuth, requestPostsByCategories} = this.props,
			props = {posts, setRating, isAuth, requestPostsByCategories}

		return (
			<Posts {...props} isUserPage={true}/>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	posts: getPostsSelector(state)
})

const mapDispatchToProps = {
	requestUserPosts,
	setRating,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPosts))