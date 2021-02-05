import React from 'react'
import s from './CreatePost.module.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import CreatePostForm from './CreatePostForm'
import {postAPI} from '../../api/requests'
import {Card} from 'antd'
import {requestCategories} from '../../redux/create-post-reducer'
import {getCategoriesSelector} from '../../redux/create-post-selectors'
import history from '../../history'
import {requestPosts} from '../../redux/posts-reducer'

const CreatePost = ({isAuth, requestCategories, categories}) => {
	const onSubmit = async ({title, content, categories}) => {
		await postAPI.create(title, content, categories)
		requestPosts()
		history.push('/')
	}

	if (!isAuth) return <Redirect to='/'/>

	return (
		<div className={s.wrapper}>
			<Card className={s.card} title='Create a post'>
				<CreatePostForm onsubmit={onSubmit} getCategories={requestCategories} categories={categories}/>
			</Card>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	categories: getCategoriesSelector(state)
})

const mapDispatchToProps = {
	requestCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)