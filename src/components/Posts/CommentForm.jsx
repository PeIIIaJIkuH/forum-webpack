import React from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Tooltip from 'antd/lib/tooltip'

const CommentForm = ({isAuth, onSubmit}) => {
	const [form] = Form.useForm()
	const [isFetching, setIsFetching] = React.useState(false)
	const textArea = (
			<Form.Item className={s.commentForm} name='content' rules={[{
				required: true,
				message: 'Please enter the comment!'
			}]}>
				<Input.TextArea allowClear rows={5} autoSize={{minRows: 2, maxRows: 5}} showCount disabled={!isAuth}/>
			</Form.Item>
		),
		button = (
			<Button type='primary' htmlType='submit' disabled={!isAuth} loading={isFetching}>
				Add Comment
			</Button>
		)

	return (
		<Form form={form} onFinish={async data => {
			setIsFetching(true)
			await onSubmit(data)
			form.resetFields()
			setIsFetching(false)
		}}>
			{isAuth ? textArea :
				<Tooltip title='Only for authorized users.' placement='bottom'>
					{textArea}
				</Tooltip>
			}
			<Form.Item>
				{isAuth ? button :
					<Tooltip title='Only for authorized users.' placement='bottom'>
						{button}
					</Tooltip>
				}
			</Form.Item>
		</Form>
	)
}

export default CommentForm