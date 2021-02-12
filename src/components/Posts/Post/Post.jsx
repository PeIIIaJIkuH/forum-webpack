import React from 'react'
import s from '../Posts.module.css'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
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
import history from '../../../history'

const Post = ({post, setRating, isAuth, requestPostsByCategories, userID, deletePost, setPostToEdit}) => {
	const onEdit = async () => {
		await setPostToEdit(post)
		history.push('/edit')
	}

	return (
		<>
			{post &&
			<Card className={s.post}>
				<Row>
					<Col className={s.rating} span={2}>
						<Rate isAuth={isAuth} setRating={setRating} post={post}/>
					</Col>
					<Col span={21}>
						<Header post={post} userID={userID} deletePost={deletePost} onEdit={onEdit}/>
						<Content content={post.content}/>
						<Divider className={s.divider}/>
						<Categories categories={post.categories} requestPostsByCategories={requestPostsByCategories}/>
						<Footer post={post}/>
					</Col>
				</Row>
			</Card>}
		</>
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