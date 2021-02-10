import React from 'react'
import s from './CreatePost.module.css'
import {connect} from 'react-redux'
import {getCategoriesSelector, getIsAuthSelector} from '../../redux/selectors'
import CreatePostForm from './CreatePostForm'
import {postAPI} from '../../api/requests'
import Card from 'antd/lib/card'
import {requestCategories} from '../../redux/categories-reducer'
import history from '../../history'
import {requestAllPosts} from '../../redux/posts-reducer'
import {Error403} from '../common/errors'
import {Helmet} from 'react-helmet'
import {toastOptions} from '../../utils/helpers/helpers'
import {toast} from 'react-toastify'

const CreatePost = ({isAuth, requestCategories, categories}) => {
	const [isFetching, setIsFetching] = React.useState(false)

	const onSubmit = async ({title, content, categories}) => {
		setIsFetching(true)
		const data = await postAPI.create(title, content.replace(/\n+/, '\n'), categories)
		setIsFetching(false)
		if (data && data.status) {
			await requestAllPosts()
			await requestCategories()
			history.push('/')
		} else {
			toast.warning('Something went wrong. Can not create post.', toastOptions)
		}
	}

	if (!isAuth) return <Error403/>

	return (
		<>
			<Helmet><title>Create Post | forume</title></Helmet>
			<div className={s.wrapper}>
				<Card className={s.card} title='Create a post' headStyle={{fontSize: '20px', fontWeight: 600}}>
					<CreatePostForm onsubmit={onSubmit} requestCategories={requestCategories} categories={categories}
									isFetching={isFetching}/>
				</Card>
			</div>
		</>
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