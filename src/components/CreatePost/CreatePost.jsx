import React from 'react'
import s from './CreatePost.module.css'
import {connect} from 'react-redux'
import {categoriesSelector, isAuthSelector, postToEditSelector} from '../../redux/selectors'
import CreatePostForm from './CreatePostForm'
import {postAPI} from '../../api/requests'
import Card from 'antd/lib/card'
import {requestCategories} from '../../redux/categories-reducer'
import history from '../../history'
import {requestAllPosts, setPostToEdit} from '../../redux/posts-reducer'
import Error403 from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {notificationType, openNotification, toastOptions} from '../../utils/helpers/helpers'
import {toast} from 'react-toastify'
import {withRouter} from 'react-router-dom'
import Error404 from '../common/errors/Error404'

const CreatePost = ({isAuth, requestCategories, categories, postToEdit, setPostToEdit, location}) => {
	const [isFetching, setIsFetching] = React.useState(false)

	if (!isAuth) return <Error403/>
	if (location.pathname.indexOf('/edit') === 0 && !postToEdit) return <Error404/>

	const onSubmit = async ({title, content, categories}) => {
		setIsFetching(true)
		if (!postToEdit) {
			const data = await postAPI.create(title, content.replace(/\n+/, '\n'), categories)
			if (data && data.status) {
				await requestAllPosts()
				await requestCategories()
				await setIsFetching(false)
				history.push('/')
			} else {
				openNotification(notificationType.ERROR, `Can not ${!postToEdit ? 'create' : 'edit'} post!`)
			}
		} else {
			await postAPI.edit(postToEdit.id, postToEdit.author.id, title, content, categories)
			await setIsFetching(false)
			history.goBack()
		}
	}

	const title = (postToEdit ? 'Edit' : 'Create') + ' post',
		headStyle = {fontSize: '20px', fontWeight: 600}

	return (
		<>
			<Helmet><title>Create Post | forume</title></Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title={title}
					  headStyle={headStyle}>
					<CreatePostForm onsubmit={onSubmit} requestCategories={requestCategories} categories={categories}
									isFetching={isFetching} post={postToEdit} setPost={setPostToEdit}/>
				</Card>
			</div>
		</>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	categories: categoriesSelector(state),
	postToEdit: postToEditSelector(state)
})

const mapDispatchToProps = {
	requestCategories,
	setPostToEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost))