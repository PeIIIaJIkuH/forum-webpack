import React, {FC, useEffect, useState} from 'react'
import s from './Posts.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {isAuthSelector, postsSelector, selectedCategoriesSelector, userIDSelector} from '../../redux/selectors'
import {requestAllPosts, requestRatedPosts, requestUserPosts} from '../../redux/posts-reducer'
import {Post} from './Post/Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Error404} from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import {Error403} from '../common/errors/Error403'
import Tag from 'antd/lib/tag'
import Typography from 'antd/lib/typography'
import {TComment, TPost} from '../../types/types'

type PathParamsType = {
	id: string,
}

type OwnProps = & {
	type?: string
	postPage?: boolean
	userComments?: { [key: string]: TComment[] } | null
}

type Props = OwnProps & RouteComponentProps<PathParamsType>

const PostsComponent: FC<Props> = ({type, match, userComments}) => {
	const posts = useSelector(postsSelector),
		userID = useSelector(userIDSelector),
		isAuth = useSelector(isAuthSelector),
		selected = useSelector(selectedCategoriesSelector)

	const dispatch = useDispatch()

	const urlId = match.params.id,
		[title, setTitle] = useState('Home')

	useEffect(() => {
		if (type === 'my') {
			setTitle('My Posts')
			userID && dispatch(requestUserPosts(userID))
		} else if (type === 'user') {
			setTitle('user')
			dispatch(requestUserPosts(+urlId))
		} else if (type === 'upvoted' || type === 'downvoted') {
			setTitle(type === 'upvoted' ? 'Upvoted Posts' : 'Downvoted Posts')
			userID && dispatch(requestRatedPosts(userID, type))
		} else if (type === 'categories')
			setTitle('Search by Categories')
		else {
			setTitle('Home')
			dispatch(requestAllPosts())
		}
	}, [type, urlId, userID, dispatch])

	if ((urlId !== undefined && isNaN(+urlId)) || (type === 'categories' && !selected))
		return <Error404/>
	if (!isAuth && (type === 'my' || type === 'upvoted' || type === 'downvoted'))
		return <Error403/>

	return <>
		<Helmet><title>{title} | forume</title></Helmet>
		{type === 'categories' && <>
			<section className={s.searchByCategories}>
				<Card title={<Typography.Title level={4}>Search by Categories</Typography.Title>}>
					{selected?.map(tag => <Tag key={tag}>{tag}</Tag>)}
				</Card>
			</section>
		</>}
		<section className='posts'>
			{posts?.length ?
				posts && posts.map((post: TPost) => (
					<Post post={post} key={post.id} isAuth={isAuth} userID={userID} dispatch={dispatch}
						  comments={userComments ? userComments[post.id] : undefined}/>
				)) :
				<Card>
					<Empty className={s.empty} description='No Posts'/>
				</Card>
			}
		</section>
	</>
}

export const Posts = withRouter(PostsComponent)