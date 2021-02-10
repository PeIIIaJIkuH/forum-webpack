import React from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'

const CommentForm = ({isAuth, onSubmit}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	return (
		<Form form={form} onFinish={async data => {
			setIsFetching(true)
			await onSubmit(data)
			form.resetFields()
			setIsFetching(false)
		}}>
			<Form.Item className={s.commentForm} name='content' rules={[{
				required: true,
				message: 'Please enter the comment!'
			}]}>
				<Input.TextArea allowClear rows={5} autoSize={{minRows: 2, maxRows: 5}} showCount disabled={!isAuth}/>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' disabled={!isAuth} loading={isFetching}>
					Add Comment
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CommentForm