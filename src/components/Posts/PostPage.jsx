import React from 'react'
import {withRouter} from 'react-router-dom'
import s from './Posts.module.css'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Card from 'antd/lib/card'
import {postAPI} from '../../api/requests'
import {getCommentsSelector, getIsAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestComments, requestPost, requestPostsByCategories, setRating} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import {Error404} from '../common/errors'
import Post from './Post'
import Empty from 'antd/lib/empty'

const PostPage = ({
					  isAuth, comments, requestComments, match, posts, requestPost, requestPostsByCategories,
					  setRating
				  }) => {
	const urlId = match.params.id

	const onSubmit = async ({content}) => {
		await postAPI.addComment(+urlId, content)
		await requestComments(+urlId)
	}

	React.useEffect(() => {
		requestPost(+urlId)
		requestComments(+urlId)
	}, [urlId, requestPost, requestComments])

	if (urlId !== undefined && isNaN(+urlId)) return <Error404/>

	return (
		<>
			<Helmet><title>Comments | forume</title></Helmet>
			<section className='posts'>
				{posts ?
					posts.map((post, i) => (
						<Post post={post} key={i} isAuth={isAuth} requestPostsByCategories={requestPostsByCategories}
							  setRating={setRating}/>
					)) :
					<Card><Empty/></Card>
				}
			</section>
			<section className='comments'>
				<Card className={s.commentsCard}>
					<CommentForm isAuth={isAuth} onSubmit={onSubmit}/>
					<Comments comments={comments}/>
				</Card>
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	posts: getPostsSelector(state),
	isAuth: getIsAuthSelector(state),
	comments: getCommentsSelector(state)
})

const mapDispatchToProps = {
	requestComments,
	requestPostsByCategories,
	setRating,
	requestPost
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostPage))