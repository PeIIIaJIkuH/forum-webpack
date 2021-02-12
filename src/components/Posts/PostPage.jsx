import React from 'react'
import {withRouter} from 'react-router-dom'
import s from './Posts.module.css'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Card from 'antd/lib/card'
import {postAPI} from '../../api/requests'
import {commentsSelector, isAuthSelector, getPostsSelector} from '../../redux/selectors'
import {requestComments, requestPost} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import Error404 from '../common/errors/Error404'
import Post from './Post/Post'
import {setUrlTo} from '../../redux/app-reducer'

const PostPage = ({isAuth, comments, requestComments, match, posts, requestPost, setUrlTo}) => {
	const urlId = match.params.id,
		[check, setCheck] = React.useState(true)

	React.useEffect(() => {
		const initialize = async () => {
			const check = await requestPost(+urlId)
			if (!check) {
				setCheck(false)
			}
			requestComments(+urlId)
		}
		initialize()
	}, [urlId, requestPost, requestComments])

	const onSubmit = async ({content}) => {
		await postAPI.addComment(+urlId, content)
		await requestComments(+urlId)
	}

	if ((urlId !== undefined && isNaN(+urlId)) || !check) return <Error404/>

	return posts && (
		<>
			<Helmet><title>Comments | forume</title></Helmet>
			<section className='posts'>
				{posts.map((post, i) => (
					<Post post={post} key={i}/>
				))}
			</section>
			<section className='comments'>
				<Card className={s.commentsCard}>
					<CommentForm isAuth={isAuth} onSubmit={onSubmit} setUrlTo={setUrlTo}/>
					<Comments comments={comments} setUrlTo={setUrlTo}/>
				</Card>
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	posts: getPostsSelector(state),
	isAuth: isAuthSelector(state),
	comments: commentsSelector(state)
})

const mapDispatchToProps = {
	requestComments,
	requestPost,
	setUrlTo
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostPage))