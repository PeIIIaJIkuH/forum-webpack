import React from 'react'
import s from '../Posts.module.css'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Card from 'antd/lib/card'
import Divider from 'antd/lib/divider'
import {connect} from 'react-redux'
import {deletePost, requestPostsByCategories, setRating} from '../../../redux/posts-reducer'
import {getIsAuthSelector, getUserIDSelector} from '../../../redux/selectors'
import Rate from './Rate'
import Header from './Header'
import Content from './Content'
import Categories from './Categories'
import Footer from './Footer'

const Post = ({post, setRating, isAuth, requestPostsByCategories, userID, deletePost}) => {
	return (
		<Card className={s.post}>
			<Row>
				<Col className={s.rating} span={2}>
					<Rate isAuth={isAuth} setRating={setRating} post={post}/>
				</Col>
				<Col span={21}>
					<Header post={post} userID={userID} deletePost={deletePost}/>
					<Content content={post.content}/>
					<Divider className={s.divider}/>
					<Categories categories={post.categories} requestPostsByCategories={requestPostsByCategories}/>
					<Footer post={post}/>
				</Col>
			</Row>
		</Card>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	userID: getUserIDSelector(state)
})

const mapDispatchToProps = {
	setRating,
	requestPostsByCategories,
	deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)