import React from 'react'
import s from './Posts.module.css'
import {Button, Form, Input} from 'antd'

const CommentForm = ({isAuth, onSubmit}) => {
	const [form] = Form.useForm()
	return (
		<Form form={form} onFinish={data => {
			onSubmit(data)
			form.resetFields()
		}}>
			<Form.Item className={s.commentForm} name='content' rules={[{
				required: true,
				message: 'Please enter the comment!'
			}]}>
				<Input.TextArea allowClear rows={5} autoSize={{minRows: 2, maxRows: 5}} showCount disabled={!isAuth}/>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' disabled={!isAuth}>
					Add Comment
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CommentForm