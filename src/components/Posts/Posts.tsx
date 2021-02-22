import React, {FC} from 'react'
import s from './Posts.module.css'
import {connect} from 'react-redux'
import {isAuthSelector, postsSelector, selectedCategoriesSelector, userIDSelector} from '../../redux/selectors'
import {
	RequestAllPosts,
	requestAllPosts,
	RequestPostsByCategories,
	requestPostsByCategories,
	RequestRatedPosts,
	requestRatedPosts,
	RequestUserPosts,
	requestUserPosts
} from '../../redux/posts-reducer'
import Post from './Post/Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Error404 from '../common/errors/Error404'
import {Helmet} from 'react-helmet'
import Error403 from '../common/errors/Error403'
import Tag from 'antd/lib/tag'
import Typography from 'antd/lib/typography'
import {TPost} from '../../types/types'
import {State} from '../../redux/store'

type PathParamsType = {
	id: string,
}

type OwnProps = RouteComponentProps<PathParamsType> & {
	type?: string
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps & RouteComponentProps

const Posts: FC<Props> = ({
							  type, posts, match, userID, requestUserPosts, requestRatedPosts, requestPostsByCategories,
							  requestAllPosts, isAuth, selected
						  }) => {
	const urlId = match.params.id,
		[title, setTitle] = React.useState('Home')

	React.useEffect(() => {
		if (type === 'my') {
			setTitle('My Posts')
			userID && requestUserPosts(userID)
		} else if (type === 'user') {
			setTitle('user')
			requestUserPosts(+urlId)
		} else if (type === 'upvoted' || type === 'downvoted') {
			setTitle(type === 'upvoted' ? 'Upvoted Posts' : 'Downvoted Posts')
			userID && requestRatedPosts(userID, type)
		} else if (type === 'categories') {
			setTitle('Search by Categories')
		} else {
			setTitle('Home')
			requestAllPosts()
		}
	}, [type, urlId, requestUserPosts, requestRatedPosts, requestPostsByCategories, requestAllPosts, userID])

	if ((urlId !== undefined && isNaN(+urlId)) || (type === 'categories' && !selected)) return <Error404/>
	if (!isAuth && (type === 'my' || type === 'upvoted' || type === 'downvoted')) return <Error403/>

	return (
		<>
			<Helmet><title>{title} | forume</title></Helmet>
			{type === 'categories' && (
				<section className={s.searchByCategories}>
					<Card title={<Typography.Title level={4}>Search by Categories</Typography.Title>}>
						{selected?.map(tag => <Tag key={tag}>{tag}</Tag>)}
					</Card>
				</section>
			)}
			<section className='posts'>
				{posts && posts.length ?
					posts && posts.map(post => (
						<Post post={post} key={post.id}/>
					)) :
					<Card>
						<Empty className={s.empty} description='No Posts'/>
					</Card>
				}
			</section>
		</>
	)
}

type MapStateToProps = {
	posts: TPost[] | null
	userID: number | null
	isAuth: boolean
	selected: string[] | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	posts: postsSelector(state),
	userID: userIDSelector(state),
	isAuth: isAuthSelector(state),
	selected: selectedCategoriesSelector(state)
})

type MapDispatchToProps = {
	requestAllPosts: RequestAllPosts
	requestUserPosts: RequestUserPosts
	requestRatedPosts: RequestRatedPosts
	requestPostsByCategories: RequestPostsByCategories
}
const mapDispatchToProps: MapDispatchToProps = {
	requestAllPosts,
	requestUserPosts,
	requestRatedPosts,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts))