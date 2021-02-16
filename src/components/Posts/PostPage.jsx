import React from 'react'
import {withRouter} from 'react-router-dom'
import s from './Posts.module.css'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Card from 'antd/lib/card'
import {postAPI} from '../../api/requests'
import {commentsSelector, isAuthSelector, postsSelector} from '../../redux/selectors'
import {deleteComment, requestComments, requestPost} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import Error404 from '../common/errors/Error404'
import Post from './Post/Post'
import {setUrlTo} from '../../redux/app-reducer'
import {notificationType, openNotification} from '../../utils/helpers/helpers'

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

	if ((urlId !== undefined && isNaN(+urlId)) || !check) return <Error404/>

	const onSubmit = async ({content}) => {
		const data = await postAPI.addComment(+urlId, content.replace(/((\r\n)|\r|\n)+/gm, '\n'))
		if (data && data.status) {
			await requestComments(+urlId)
		} else {
			openNotification(notificationType.ERROR, 'Can not add comment!')
		}
	}

	const postCards = posts && posts.map((post, i) => (
		<Post post={post} key={i} postPage/>
	))

	return posts && (
		<>
			<Helmet><title>Comments | forume</title></Helmet>
			<section className='posts'>
				{postCards}
			</section>
			<section className='comments'>
				<Card className={s.commentsCard}>
					<CommentForm isAuth={isAuth} onSubmit={onSubmit} setUrlTo={setUrlTo}/>
					<Comments comments={comments} isAuth={isAuth} deleteComment={deleteComment}/>
				</Card>
			</section>
		</>
	)
}

const mapStateToProps = state => ({
	posts: postsSelector(state),
	isAuth: isAuthSelector(state),
	comments: commentsSelector(state)
})

const mapDispatchToProps = {
	requestComments,
	requestPost,
	setUrlTo,
	deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostPage))