import React from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import {Link, withRouter} from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea'

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

	const rules = [{
			required: true,
			message: 'Please enter the comment!'
		}],
		autoSize = {minRows: 2, maxRows: 5}

	return (
		<Form form={form} onFinish={onFinish}>
			<Form.Item className={s.commentForm} name='content' rules={rules}>
				<TextArea allowClear rows={5} autoSize={autoSize} showCount disabled={!isAuth}/>
			</Form.Item>
			<Form.Item>
				<Button className={s.addComment} type='primary' htmlType='submit' disabled={!isAuth}
						loading={isFetching}>
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