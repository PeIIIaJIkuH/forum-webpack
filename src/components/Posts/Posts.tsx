import React, {FC, useEffect, useState} from 'react'
import s from './Posts.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {isAuthSelector, postsSelector, selectedCategoriesSelector, userIDSelector} from '../../redux/selectors'
import {requestAllPosts, requestPostsByCategories, requestRatedPosts, requestUserPosts} from '../../redux/posts-reducer'
import {Post} from './Post/Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom'
import {Error404} from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import {Error403} from '../common/errors/Error403'
import Tag from 'antd/lib/tag'
import Typography from 'antd/lib/typography'
import {TComment, TPost} from '../../types/types'
import * as queryString from 'query-string'
import {setSelectedCategories} from '../../redux/categories-reducer'

type Props = & {
	type?: 'my' | 'user' | 'up-voted' | 'down-voted' | 'post-page' | 'categories'
	postPage?: boolean
	userComments?: { [key: string]: TComment[] } | null
	postID?: number
}

export const Posts: FC<Props> = ({type, userComments, postID}) => {
	const posts = useSelector(postsSelector),
		userID = useSelector(userIDSelector),
		isAuth = useSelector(isAuthSelector),
		selected = useSelector(selectedCategoriesSelector),
		history = useHistory(),
		location = useLocation(),
		match = useRouteMatch<{ id: string }>()

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
		} else if (type === 'up-voted' || type === 'down-voted') {
			setTitle(type === 'up-voted' ? 'Upvoted Posts' : 'Downvoted Posts')
			userID && dispatch(requestRatedPosts(userID, type))
		} else if (type === 'categories') {
			setTitle('Search by Categories')
			const parsed = queryString.parse(location.search, {arrayFormat: 'comma'})
			const categories = parsed.categories
			if (categories) {
				if (categories instanceof Array) {
					dispatch(setSelectedCategories(categories))
					dispatch(requestPostsByCategories(categories))
				} else {
					dispatch(setSelectedCategories([categories]))
					dispatch(requestPostsByCategories([categories]))
				}
			}
		} else if (type === 'post-page') {
		} else {
			setTitle('Home')
			dispatch(requestAllPosts())
		}
	}, [type, urlId, userID, postID, history, location.pathname, location.search, dispatch])


	if ((urlId !== undefined && isNaN(+urlId)) || (type === 'categories' && !selected))
		return <Error404/>
	if (!isAuth && (type === 'my' || type === 'up-voted' || type === 'down-voted'))
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