import React from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import s from './CreatePost.module.css'
import history from '../../history'
import {CloudUploadOutlined, StopOutlined} from '@ant-design/icons'

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

const CreatePostForm = ({requestCategories, categories, isFetching, onsubmit}) => {
	React.useEffect(() => {
		requestCategories()
	}, [requestCategories])

	return (
		<Form className={s.form} {...layout} name='createPost' onFinish={onsubmit}>
			<Form.Item label='Title' name='title' rules={[{
				required: true,
				message: 'Please enter post title!'
			}]}>
				<Input autoFocus/>
			</Form.Item>
			<Form.Item label='Content' name='content' rules={[{
				required: true,
				message: 'Please enter post content!'
			}]}>
				<Input.TextArea allowClear rows={5} autoSize={{minRows: 3, maxRows: 10}} showCount/>
			</Form.Item>
			<Form.Item label='Categories' name='categories'>
				<Select
					mode='tags'
					size='default'
					placeholder='Please select categories'
					allowClear
				>
					{categories && categories.map(e => (
						<Select.Option key={e}>{e}</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item className={s.buttons} {...tailLayout}>
				<Button className={s.create} type='primary' htmlType='submit' icon={<CloudUploadOutlined/>}
						loading={isFetching}>
					Create
				</Button>
				<Button type='primary' danger onClick={onCancel} icon={<StopOutlined/>}>Cancel</Button>
			</Form.Item>
		</Form>
	)
}

export default CreatePostForm