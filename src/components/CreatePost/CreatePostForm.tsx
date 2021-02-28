import React, {FC} from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import s from './CreatePost.module.css'
import history from '../../history'
import {CloudUploadOutlined, SaveOutlined, StopOutlined} from '@ant-design/icons'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea'
import {defaultValidator} from '../../utils/helpers/helpers'
import {requestCategories, RequestCategories} from '../../redux/categories-reducer'
import {requestAllPosts, setPostToEdit, SetPostToEdit} from '../../redux/posts-reducer'
import {Category, TPost} from '../../types/types'
import {State} from '../../redux/store'
import {categoriesSelector, postToEditSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import {postAPI} from '../../api/requests'
import ImageUpload from './ImageUpload'
import message from 'antd/lib/message'

const layout = {
	labelCol: {span: 4},
	wrapperCol: {span: 20}
}

const tailLayout = {
	wrapperCol: {span: 24}
}

type OwnProps = {
	isFetching: boolean
	setIsFetching: (fetching: boolean) => void
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps & RouteComponentProps

const CreatePostForm: FC<Props> = ({
									   requestCategories, categories, isFetching,
									   postToEdit, setPostToEdit, location,
									   setIsFetching
								   }) => {
	React.useEffect(() => {
		requestCategories()
		return () => setPostToEdit(null)
	}, [requestCategories, postToEdit, setPostToEdit, location.pathname])

	const [isImage, setIsImage] = React.useState(postToEdit?.isImage || false),
		[imagePath, setImagePath] = React.useState(postToEdit?.imagePath || '')

	type obj = { title: string, content: string, categories: string[] }
	const onSubmit = async ({title, content, categories}: obj) => {
		setIsFetching(true)
		title = title.trim()
		content = content?.replace(/\n+/, '\n').split('\n').map(line => line.trim()).join('\n')
		categories = categories.map(tag => tag.trim())
		if (!postToEdit) {
			const data = await postAPI.create(title, content, categories, isImage, imagePath)
			if (data && data.status) {
				await requestAllPosts()
				await requestCategories()
				await setIsFetching(false)
				history.push('/')
			} else
				message.error(`Can not ${!postToEdit ? 'create' : 'edit'} post!`)
		} else {
			await postAPI.edit(postToEdit.id, postToEdit.author.id, title, content, categories, isImage, imagePath)
			await setIsFetching(false)
			history.goBack()
		}
	}

	const onCancel = () => {
		history.goBack()
	}

	const defaultFileList = [{
		uid: '1',
		name: postToEdit?.imagePath.split('images/')[1],
		status: 'done',
		url: `https://${postToEdit?.imagePath}`
	}]

	return <>
		<Form className={s.form} {...layout} name='createPost' onFinish={onSubmit}>
			<Form.Item label='Title' name='title' rules={[defaultValidator('Title')]} initialValue={postToEdit?.title}>
				<Input autoFocus/>
			</Form.Item>
			<Form.Item label='Content' name='content' initialValue={postToEdit?.content}
					   rules={!isImage ? [defaultValidator('Content')] : undefined}>
				<TextArea allowClear autoSize={{minRows: 3, maxRows: 10}} showCount/>
			</Form.Item>
			<Form.Item label='Image' name='image'>
				<ImageUpload setImagePath={setImagePath} setIsImage={setIsImage} postToEdit={postToEdit}
							 defaultFileList={postToEdit?.isImage && defaultFileList}/>
			</Form.Item>
			<Form.Item label='Categories' name='categories' rules={[defaultValidator('Categories')]}
					   initialValue={postToEdit?.categories.map(category => category.name)}>
				<Select mode='tags' allowClear>
					{categories?.map(category => (
						<Select.Option key={category.name} value={category.name}>
							{category.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item className={s.buttons} {...tailLayout}>
				<Button type='primary' danger onClick={onCancel} icon={<StopOutlined/>}>
					Cancel
				</Button>
				<Button className={s.create} type='primary' htmlType='submit'
						icon={postToEdit ? <SaveOutlined/> : <CloudUploadOutlined/>} loading={isFetching}>
					{postToEdit ? 'Save' : 'Create'}
				</Button>
			</Form.Item>
		</Form>
	</>
}

type MapStateToProps = {
	categories: Category[] | null
	postToEdit: TPost | null
}
const mapStateToProps = (state: State) => ({
	categories: categoriesSelector(state),
	postToEdit: postToEditSelector(state)
})

type MapDispatchToProps = {
	setPostToEdit: SetPostToEdit
	requestCategories: RequestCategories
}
const mapDispatchToProps: MapDispatchToProps = {
	setPostToEdit,
	requestCategories
}


export default connect<MapStateToProps, MapDispatchToProps, OwnProps, State>(mapStateToProps, mapDispatchToProps)(withRouter(CreatePostForm))