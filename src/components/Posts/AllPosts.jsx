import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestPosts, requestPostsByCategories, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import {Helmet} from 'react-helmet'

class AllPosts extends React.Component {
	async componentDidMount() {
		await this.props.requestPosts()
	}

	render() {
		const {posts, setRating, isAuth, requestPostsByCategories} = this.props,
			props = {posts, setRating, isAuth, requestPostsByCategories}
		return (
			<>
				<Helmet><title>Home | forume</title></Helmet>
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
	requestPosts,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)