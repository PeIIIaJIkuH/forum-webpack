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
import {RequestCategories} from '../../redux/categories-reducer'
import {SetPostToEdit} from '../../redux/posts-reducer'
import {Category, TPost} from '../../types/types'

const layout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 20
	}
}

const tailLayout = {
	wrapperCol: {
		span: 24
	}
}

type Props = {
	isFetching: boolean
	categories: Category[] | null
	post: TPost | null
	setPostToEdit: SetPostToEdit
	requestCategories: RequestCategories
	onsubmit: (obj: { title: string, content: string, categories: string[] }) => Promise<void>
	location: RouteComponentProps
} & RouteComponentProps

const CreatePostForm: FC<Props> = ({
									   requestCategories,
									   categories,
									   isFetching,
									   onsubmit,
									   post,
									   setPostToEdit,
									   location
								   }) => {
	React.useEffect(() => {
		requestCategories()
		return () => {
			setPostToEdit(null)
		}
	}, [requestCategories, post, setPostToEdit, location.pathname])

	const onCancel = () => {
		history.goBack()
	}

	const defaultTitle = post && post.title,
		defaultContent = post && post.content,
		defaultCategories = post && post.categories ? post.categories.map(e => e.name) : [],
		titleRules = [defaultValidator('Title')],
		contentRules = [defaultValidator('Content')],
		categoriesRules = [defaultValidator('Categories')]

	return (
		<Form className={s.form} {...layout} name='createPost' onFinish={onsubmit}>
			<Form.Item label='Title' name='title' rules={titleRules} initialValue={defaultTitle}>
				<Input autoFocus allowClear/>
			</Form.Item>
			<Form.Item label='Content' name='content' initialValue={defaultContent} rules={contentRules}>
				<TextArea allowClear autoSize={{minRows: 3, maxRows: 10}} showCount/>
			</Form.Item>
			<Form.Item label='Categories' name='categories' rules={categoriesRules}
					   initialValue={defaultCategories.length === 0 ? undefined : defaultCategories}>
				<Select mode='tags' allowClear>
					{categories?.map(e => (
						<Select.Option key={e.name} value={e.name}>{e.name}</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item className={s.buttons} {...tailLayout}>
				<Button type='primary' danger onClick={onCancel} icon={<StopOutlined/>}>
					Cancel
				</Button>
				<Button className={s.create} type='primary' htmlType='submit'
						icon={post ? <SaveOutlined/> : <CloudUploadOutlined/>} loading={isFetching}>
					{post ? 'Save' : 'Create'}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default withRouter(CreatePostForm)