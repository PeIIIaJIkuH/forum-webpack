import React, {FC, useEffect, useState} from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import s from './Posts.module.css'
import {CommentForm} from './CommentForm'
import {Comments} from './Comments'
import Card from 'antd/lib/card'
import {postAPI} from '../../api/requests'
import {commentsSelector, isAuthSelector, postsSelector} from '../../redux/selectors'
import {useDispatch, useSelector} from 'react-redux'
import {Helmet} from 'react-helmet'
import {Error404} from '../common/errors/Error404'
import message from 'antd/lib/message'
import {Posts} from './Posts'
import {requestPost} from '../../redux/posts-reducer'
import {requestComments} from '../../redux/comments-reducer'

type PathParamsType = {
	id: string,
}

type Props = RouteComponentProps<PathParamsType>

const PostPageComponent: FC<Props> = ({match}) => {
	const posts = useSelector(postsSelector),
		isAuth = useSelector(isAuthSelector),
		comments = useSelector(commentsSelector)

	const dispatch = useDispatch()

	const urlId = match.params.id,
		[check, setCheck] = useState(true)

	useEffect(() => {
		const initialize = async () => {
			const ok: any = await dispatch(requestPost(+urlId))
			if (!ok) {
				setCheck(false)
			}
			dispatch(requestComments(+urlId))
		}
		initialize().then()
	}, [urlId, dispatch])

	if ((urlId !== undefined && isNaN(+urlId)) || !check)
		return <Error404/>

	type obj = { content: string }
	const onSubmit = async ({content}: obj) => {
		const data = await postAPI
			.addComment(+urlId, content.replace(/((\r\n)|\r|\n)+/gm, '\n').split('\n')
				.map(line => line.trim()).join('\n'))
		if (data && data.status)
			await dispatch(requestComments(+urlId))
		else
			message.error('Can not add comment!')
	}

	return posts && <>
		<Helmet><title>Comments | forume</title></Helmet>
		<Posts postPage type='post-page' postID={+urlId}/>
		<section className={s.comments}>
			<Card className={s.commentsCard}>
				<CommentForm isAuth={isAuth} onSubmit={onSubmit}/>
				<Comments comments={comments}/>
			</Card>
		</section>
	</>
}

export const PostPage = withRouter(PostPageComponent)