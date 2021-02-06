import React from 'react'
import s from './CreatePost.module.css'
import {connect} from 'react-redux'
import {getCategoriesSelector, getIsAuthSelector} from '../../redux/selectors'
import CreatePostForm from './CreatePostForm'
import {postAPI} from '../../api/requests'
import {Card} from 'antd'
import {requestCategories} from '../../redux/categories-reducer'
import history from '../../history'
import {requestPosts} from '../../redux/posts-reducer'
import {Error403} from '../common/errors'

const CreatePost = ({isAuth, requestCategories, categories}) => {
	const onSubmit = async ({title, content, categories}) => {
		await postAPI.create(title, content.replace(/\n+/, '\n'), categories)
		await requestPosts()
		history.push('/')
	}

	if (!isAuth) return <Error403/>

	return (
		<div className={s.wrapper}>
			<Card className={s.card} title='Create a post' headStyle={{fontSize: '20px', fontWeight: 600}}>
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