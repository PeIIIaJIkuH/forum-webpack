import React, {FC, useState} from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import {defaultValidator} from '../../utils/helpers/helpers'
import {useForm} from 'antd/lib/form/Form'

type Props = {
	isAuth: boolean
	onSubmit: (obj: { content: string }) => Promise<void>
}

export const CommentForm: FC<Props> = ({isAuth, onSubmit}) => {
	const [form] = useForm()
	const [isFetching, setIsFetching] = useState(false)

	const onFinish = async (data: any) => {
		setIsFetching(true)
		await onSubmit(data)
		form.resetFields()
		setIsFetching(false)
	}

	return <>
		<Form form={form} onFinish={onFinish}>
			<Form.Item name='content' rules={[defaultValidator('Comment')]}>
				<TextArea allowClear rows={5} autoSize={{minRows: 2, maxRows: 5}} showCount disabled={!isAuth}/>
			</Form.Item>
			<Form.Item>
				<Button className={s.addComment} type='primary' htmlType='submit' disabled={!isAuth}
						loading={isFetching}>
					Add Comment
				</Button>
			</Form.Item>
		</Form>
	</>
}
