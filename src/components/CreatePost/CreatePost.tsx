import React, {FC} from 'react'
import s from './CreatePost.module.css'
import {connect} from 'react-redux'
import {categoriesSelector, isAuthSelector, postToEditSelector} from '../../redux/selectors'
import CreatePostForm from './CreatePostForm'
import {postAPI} from '../../api/requests'
import Card from 'antd/lib/card'
import {RequestCategories, requestCategories} from '../../redux/categories-reducer'
import history from '../../history'
import {requestAllPosts, SetPostToEdit, setPostToEdit} from '../../redux/posts-reducer'
import Error403 from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {notificationType, openNotification} from '../../utils/helpers/helpers'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Error404 from '../common/errors/Error404'
import {Category, TPost} from '../../types/types'
import {State} from '../../redux/store'

type OwnProps = {
	location: RouteComponentProps
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps & RouteComponentProps

const CreatePost: FC<Props> = ({isAuth, requestCategories, categories, postToEdit, setPostToEdit, location}) => {
	const [isFetching, setIsFetching] = React.useState(false)

	if (!isAuth) return <Error403/>
	if (location.pathname.indexOf('/edit') === 0 && !postToEdit) return <Error404/>

	type obj = { title: string, content: string, categories: string[] }
	const onSubmit = async ({title, content, categories}: obj) => {
		setIsFetching(true)
		content = content.replace(/\n+/, '\n').split('\n').map(line => line.trim()).join('\n')
		categories = categories.map(tag => tag.trim())
		if (!postToEdit) {
			const data = await postAPI.create(title.trim(), content, categories)
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
									isFetching={isFetching} post={postToEdit} setPostToEdit={setPostToEdit}/>
				</Card>
			</div>
		</>
	)
}

type MapStateToProps = {
	isAuth: boolean
	categories: Category[] | null
	postToEdit: TPost | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state),
	categories: categoriesSelector(state),
	postToEdit: postToEditSelector(state)
})

type MapDispatchToProps = {
	requestCategories: RequestCategories
	setPostToEdit: SetPostToEdit
}
const mapDispatchToProps: MapDispatchToProps = {
	requestCategories,
	setPostToEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost))