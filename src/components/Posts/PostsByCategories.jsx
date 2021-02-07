import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestPostsByCategories, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import {Helmet} from 'react-helmet'

class PostsByCategories extends React.Component {
	async componentDidMount() {
		await this.props.requestPostsByCategories()
	}

	render() {
		return (
			<>
				<Helmet><title>Search by Categories | forume</title></Helmet>
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
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsByCategories)