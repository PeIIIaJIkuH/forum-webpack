import React from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import {Link, withRouter} from 'react-router-dom'

const CommentForm = ({isAuth, onSubmit, setUrlTo, location}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)

	const onFinish = async data => {
		setIsFetching(true)
		await onSubmit(data)
		form.resetFields()
		setIsFetching(false)
	}

	const onClick = async () => {
		await setUrlTo(location.pathname)
	}

	return (
		<Form form={form} onFinish={onFinish}>
			<Form.Item className={s.commentForm} name='content' rules={[{
				required: true,
				message: 'Please enter the comment!'
			}]}>
				<Input.TextArea allowClear rows={5} autoSize={{minRows: 2, maxRows: 5}} showCount disabled={!isAuth}/>
			</Form.Item>
			<Form.Item>
				<Button className={s.addComment} type='primary' htmlType='submit' disabled={!isAuth} loading={isFetching}>
					Add Comment
				</Button>
				{!isAuth &&
				<Link to='/auth/signin'>
					<Button type='primary' onClick={onClick}>Authorize</Button>
				</Link>}
			</Form.Item>
		</Form>
	)
}

export default withRouter(CommentForm)