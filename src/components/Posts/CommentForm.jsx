import React from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'

const CommentForm = ({isAuth, onSubmit}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	const onFinish = async data => {
		setIsFetching(true)
		await onSubmit(data)
		form.resetFields()
		setIsFetching(false)
	}

	const rules = [{
			required: true,
			message: 'Please enter the comment!'
		}],
		autoSize = {minRows: 2, maxRows: 5}

	return (
		<Form form={form} onFinish={onFinish}>
			<Form.Item name='content' rules={rules}>
				<TextArea allowClear rows={5} autoSize={autoSize} showCount disabled={!isAuth}/>
			</Form.Item>
			<Form.Item>
				<Button className={s.addComment} type='primary' htmlType='submit' disabled={!isAuth}
						loading={isFetching}>
					Add Comment
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CommentForm