import React, {FC} from 'react'
import s from '../Posts.module.css'
import Card from 'antd/lib/card'
import Divider from 'antd/lib/divider'
import {connect} from 'react-redux'
import {
	DeletePost,
	deletePost,
	RequestPostsByCategories,
	requestPostsByCategories,
	SetPostToEdit,
	setPostToEdit,
	SetRating,
	setRating
} from '../../../redux/posts-reducer'
import {isAuthSelector, userIDSelector} from '../../../redux/selectors'
import Rate from './Rate'
import Header from './Header'
import Content from './Content'
import Categories from './Categories'
import Footer from './Footer'
import {SetSelectedCategories, setSelectedCategories} from '../../../redux/categories-reducer'
import {State} from '../../../redux/store'
import {TComment, TPost} from '../../../types/types'
import Comments from '../Comments'
import Image from 'antd/lib/image'

type OwnProps = {
	post: TPost | null
	comments?: TComment[] | null
	postPage?: boolean
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps

const Post: FC<Props> = ({
							 post, setRating, isAuth, requestPostsByCategories,
							 userID, deletePost, setPostToEdit, comments,
							 postPage, setSelectedCategories
						 }) => {
	return post && (
		<Card className={s.post}>
			<Rate isAuth={isAuth} setRating={setRating} post={post}/>
			<div className={s.main}>
				<Header post={post} userID={userID} deletePost={deletePost} postPage={postPage}
						setPostToEdit={setPostToEdit}/>
				<Content content={post.content}/>
				{post.isImage && <Image src={`https://${post.imagePath}`} alt='post image'/>}
				<Divider className={s.divider}/>
				<Categories categories={post.categories} requestPostsByCategories={requestPostsByCategories}
							setSelectedCategories={setSelectedCategories}/>
				<Footer post={post}/>
				{comments && <>
					<Divider/>
					<Comments comments={comments} userPage/>
				</>}
			</div>
		</Card>
	)
}

type MapStateToProps = {
	isAuth: boolean
	userID: number | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state),
	userID: userIDSelector(state)
})

type MapDispatchToProps = {
	setRating: SetRating
	requestPostsByCategories: RequestPostsByCategories
	deletePost: DeletePost
	setPostToEdit: SetPostToEdit
	setSelectedCategories: SetSelectedCategories
}
const mapDispatchToProps = {
	setRating,
	requestPostsByCategories,
	deletePost,
	setPostToEdit,
	setSelectedCategories
}

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, State>(mapStateToProps, mapDispatchToProps)(Post)