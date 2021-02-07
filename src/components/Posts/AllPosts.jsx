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
		return (
			<>
				<Helmet><title>Home | forume</title></Helmet>
				<Posts posts={this.props.posts} setRating={this.props.setRating} isAuth={this.props.isAuth}
					   requestPostsByCategories={this.props.requestPostsByCategories}/>
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