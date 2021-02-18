import React from 'react'
import s from '../Posts.module.css'
import Card from 'antd/lib/card'
import Divider from 'antd/lib/divider'
import {connect} from 'react-redux'
import {deletePost, requestPostsByCategories, setPostToEdit, setRating} from '../../../redux/posts-reducer'
import {isAuthSelector, userIDSelector} from '../../../redux/selectors'
import Rate from './Rate'
import Header from './Header'
import Content from './Content'
import Categories from './Categories'
import Footer from './Footer'
import Comments from '../Comments'

const Post = ({
				  post, setRating, isAuth, requestPostsByCategories, userID, deletePost, setPostToEdit, comments,
				  postPage
			  }) => {
	return post && (
		<Card className={s.post}>
			<Rate isAuth={isAuth} setRating={setRating} post={post}/>
			<div className={s.main}>
				<Header post={post} userID={userID} deletePost={deletePost} postPage={postPage}
						setPostToEdit={setPostToEdit}/>
				<Content content={post.content}/>
				<Divider className={s.divider}/>
				<Categories categories={post.categories} requestPostsByCategories={requestPostsByCategories}/>
				<Footer post={post}/>
				{comments && (
					<>
						<Divider/>
						<Comments comments={comments} userPage/>
					</>
				)}
			</div>
		</Card>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	userID: userIDSelector(state)
})

const mapDispatchToProps = {
	setRating,
	requestPostsByCategories,
	deletePost,
	setPostToEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)