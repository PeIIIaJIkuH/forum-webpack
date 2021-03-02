import React, {Dispatch, FC} from 'react'
import s from '../Posts.module.css'
import Card from 'antd/lib/card'
import Divider from 'antd/lib/divider'
import {deletePost, requestPostsByCategories, setPostToEdit, setRating} from '../../../redux/posts-reducer'
import {Rate} from './Rate'
import {Header} from './Header'
import {Content} from './Content'
import {Categories} from './Categories'
import {Footer} from './Footer'
import {Reaction, TComment, TPost} from '../../../types/types'
import {Comments} from '../Comments'
import Image from 'antd/lib/image'
import {setSelectedCategories} from '../../../redux/categories-reducer'
import {useHistory} from 'react-router-dom'

type Props = {
	post: TPost | null
	comments?: TComment[] | null
	postPage?: boolean
	isAuth: boolean
	userID: number | null
	dispatch: Dispatch<any>
}

export const Post: FC<Props> = ({
									isAuth, userID, post,
									comments, postPage, dispatch
								}) => {
	const history = useHistory()

	const setPostToEditWrapper = (post: TPost | null) => {
			dispatch(setPostToEdit(post))
		},
		deletePostWrapper = (id: number) => {
			dispatch(deletePost(id))
		},
		setSelectedCategoriesWrapper = (categories: string[] | null) => {
			dispatch(setSelectedCategories(categories))
		},
		requestPostsByCategoriesWrapper = (categories: string[]) => {
			dispatch(requestPostsByCategories(categories))
			history.push('/by-categories')
		},
		setRatingWrapper = (id: number, reaction: Reaction) => {
			return dispatch(setRating(id, reaction))
		}

	return post && (
		<Card className={s.post}>
			<Rate isAuth={isAuth} setRating={setRatingWrapper} post={post}/>
			<div className={s.main}>
				<Header post={post} userID={userID} deletePost={deletePostWrapper} postPage={postPage}
						setPostToEdit={setPostToEditWrapper}/>
				<Content content={post.content}/>
				{post.isImage && <Image src={`https://${post.imagePath}`} alt='post image'/>}
				<Divider className={s.divider}/>
				<Categories categories={post.categories} requestPostsByCategories={requestPostsByCategoriesWrapper}
							setSelectedCategories={setSelectedCategoriesWrapper}/>
				<Footer post={post}/>
				{comments && <>
					<Divider/>
					<Comments comments={comments} userPage/>
				</>}
			</div>
		</Card>
	)
}
