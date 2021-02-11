import React from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'
import {FileSearchOutlined} from '@ant-design/icons'

const layout = {
	wrapperCol: {
		span: 24
	}
}

const tailLayout = {
	wrapperCol: {
		span: 24
	}
}

const ActionsForm = ({requestCategories, categories, onSubmit, isFetching}) => {
	React.useEffect(() => {
		requestCategories()
	}, [requestCategories])

	return (
		<Form {...layout} name='selectPosts' onFinish={onSubmit} layout='horizontal'>
			<Form.Item name='categories'>
				<Select mode='multiple' size='default' placeholder='Please select categories' allowClear>
					{categories && categories.map(e => (
						<Select.Option key={e}>{e}</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item {...tailLayout} className={s.btnWrapper}>
				<Button type='primary' htmlType='submit' icon={<FileSearchOutlined/>} loading={isFetching}>
					Search Posts
				</Button>
			</Form.Item>
		</Form>
	)
}

export default ActionsForm