import React from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import s from './CreatePost.module.css'
import history from '../../history'
import {CloudUploadOutlined, SaveOutlined, StopOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea'

const CreatePostForm = ({requestCategories, categories, isFetching, onsubmit, post, setPost, location}) => {
	React.useEffect(() => {
		requestCategories()
		return () => {
			setPost(null)
		}
	}, [requestCategories, post, setPost, location.pathname])

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

	const onCancel = () => {
		history.goBack()
	}

	const titleValue = post && post.title,
		titleRules = [{
			required: true,
			message: 'Please enter post title!'
		}],
		contentRules = [{
			required: true,
			message: 'Please enter post content!'
		}],
		autoSize = {minRows: 3, maxRows: 10},
		contentValue = post && post.content,
		categoriesValue = post && post.categories ? post.categories.map(e => e.name) : undefined,
		tags = categories && categories.map(e => (
			<Select.Option key={e}>{e}</Select.Option>
		)),
		icon = post ? <SaveOutlined/> : <CloudUploadOutlined/>,
		btn = post ? 'Save' : 'Create'

	return (
		<Form className={s.form} {...layout} name='createPost' onFinish={onsubmit}>
			<Form.Item label='Title' name='title' initialValue={titleValue} rules={titleRules}>
				<Input autoFocus/>
			</Form.Item>
			<Form.Item label='Content' name='content' initialValue={contentValue} rules={contentRules}>
				<TextArea allowClear rows={5} autoSize={autoSize} showCount/>
			</Form.Item>
			<Form.Item label='Categories' name='categories'
					   initialValue={categoriesValue}>
				<Select mode='tags' size='default' allowClear>
					{tags}
				</Select>
			</Form.Item>
			<Form.Item className={s.buttons} {...tailLayout}>
				<Button type='primary' danger onClick={onCancel} icon={<StopOutlined/>}>
					Cancel
				</Button>
				<Button className={s.create} type='primary' htmlType='submit'
						icon={icon} loading={isFetching}>
					{btn}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default withRouter(CreatePostForm)