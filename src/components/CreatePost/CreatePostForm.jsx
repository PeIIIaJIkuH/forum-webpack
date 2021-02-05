import React from 'react'
import {Button, Form, Input, Select} from 'antd'
import s from './CreatePost.module.css'

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
		offset: 8,
		span: 16
	}
}

class CreatePostForm extends React.Component {
	componentDidMount = () => {
		this.props.getCategories()
	}

	render = () => (
		<Form className={s.form} {...layout} name='createPost' onFinish={this.props.onsubmit}>
			<Form.Item label='Title' name='title' rules={[{
				required: true,
				message: 'Please enter post title!'
			}]}>
				<Input/>
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
					placeholder='Please select'
					allowClear
				>
					{this.props.categories && this.props.categories.map((e, i) => <Select.Option
						key={i}>{e}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CreatePostForm