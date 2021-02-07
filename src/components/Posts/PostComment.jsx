import React from 'react'
import s from './Posts.module.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCommentsSelector, getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestComments, requestPost, requestPostsByCategories, setRating} from '../../redux/posts-reducer'
import Posts from './Posts'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Card from 'antd/lib/card'
import {postAPI} from '../../api/requests'
import {Helmet} from 'react-helmet'

class PostComment extends React.Component {
	async componentDidMount() {
		const id = this.props.match.params.id
		this.props.requestPost(id)
		this.props.requestComments(+id)
	}

	render() {
		const onSubmit = async ({content}) => {
			const id = this.props.match.params.id
			await postAPI.addComment(+id, content)
			await this.props.requestComments(+id)
		}

		return (
			<>
				<Helmet><title>Forum | Comments</title></Helmet>
				<Posts posts={this.props.posts} setRating={this.props.setRating} isAuth={this.props.isAuth}
					   requestPostsByCategories={this.props.requestPostsByCategories}/>
				<Card className={s.commentSection}>
					<CommentForm isAuth={this.props.isAuth} onSubmit={onSubmit}/>
					<Comments comments={this.props.comments}/>
				</Card>
			</>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	posts: getPostsSelector(state),
	comments: getCommentsSelector(state)
})

const mapDispatchToProps = {
	requestPost,
	setRating,
	requestComments,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostComment))