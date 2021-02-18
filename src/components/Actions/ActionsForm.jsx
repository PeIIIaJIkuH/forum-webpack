import React from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'
import {FilterOutlined} from '@ant-design/icons'

const ActionsForm = ({requestCategories, categories, onSubmit, isFetching}) => {
	React.useEffect(() => {
		requestCategories()
	}, [requestCategories])

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

	const tags = categories && categories.map((e, i) => (
		<Select.Option key={i}>{e}</Select.Option>
	))

	return (
		<Form {...layout} name='selectPosts' onFinish={onSubmit} layout='horizontal'>
			<Form.Item name='categories'>
				<Select mode='multiple' size='default' placeholder='Select categories' allowClear>
					{tags}
				</Select>
			</Form.Item>
			<Form.Item {...tailLayout} className={s.btnWrapper}>
				<Button type='default' htmlType='submit' icon={<FilterOutlined/>} loading={isFetching}>
					Filter
				</Button>
			</Form.Item>
		</Form>
	)
}

export default ActionsForm