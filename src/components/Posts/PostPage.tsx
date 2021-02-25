import React, {FC} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import s from './Posts.module.css'
import CommentForm from './CommentForm'
import Comments from './Comments'
import Card from 'antd/lib/card'
import {postAPI} from '../../api/requests'
import {commentsSelector, isAuthSelector, postsSelector} from '../../redux/selectors'
import {
	DeleteComment,
	deleteComment,
	RequestComments,
	requestComments,
	RequestPost,
	requestPost
} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import Error404 from '../common/errors/Error404'
import Post from './Post/Post'
import {TComment, TPost} from '../../types/types'
import {State} from '../../redux/store'
import message from 'antd/lib/message'

type PathParamsType = {
	id: string,
}

type OwnProps = RouteComponentProps<PathParamsType>

type Props = MapStateToProp & MapDispatchToProps & OwnProps & RouteComponentProps

const PostPage: FC<Props> = ({isAuth, comments, requestComments, match, posts, requestPost}) => {
	const urlId = match.params.id,
		[check, setCheck] = React.useState(true)

	React.useEffect(() => {
		const initialize = async () => {
			const ok: any = await requestPost(+urlId)
			if (!ok) {
				setCheck(false)
			}
			requestComments(+urlId)
		}
		initialize()
	}, [urlId, requestPost, requestComments])

	if ((urlId !== undefined && isNaN(+urlId)) || !check)
		return <Error404/>

	type obj = { content: string }
	const onSubmit = async ({content}: obj) => {
		const data = await postAPI
			.addComment(+urlId, content.replace(/((\r\n)|\r|\n)+/gm, '\n').split('\n')
				.map(line => line.trim()).join('\n'))
		if (data && data.status)
			await requestComments(+urlId)
		else
			message.error('Can not add comment!')
	}

	const postCards = posts?.map(post => <Post post={post} key={post.id} postPage/>)

	return posts && <>
		<Helmet><title>Comments | forume</title></Helmet>
		<section className='posts'>
			{postCards}
		</section>
		<section className={s.comments}>
			<Card className={s.commentsCard}>
				<CommentForm isAuth={isAuth} onSubmit={onSubmit}/>
				<Comments comments={comments}/>
			</Card>
		</section>
	</>
}

type MapStateToProp = {
	posts: TPost[] | null
	isAuth: boolean
	comments: TComment[] | null
}
const mapStateToProps = (state: State): MapStateToProp => ({
	posts: postsSelector(state),
	isAuth: isAuthSelector(state),
	comments: commentsSelector(state)
})

type MapDispatchToProps = {
	requestComments: RequestComments
	requestPost: RequestPost
	deleteComment: DeleteComment
}
const mapDispatchToProps: MapDispatchToProps = {
	requestComments,
	requestPost,
	deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostPage))