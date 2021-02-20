import React from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'
import {FilterOutlined} from '@ant-design/icons'

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

const CategoriesSearchForm = ({
								  requestCategories, categories, onSubmit, isFetching, selected, setSelectedCategories,
								  form
							  }) => {
	React.useEffect(() => {
		requestCategories()
	}, [requestCategories])

	const onChange = values => {
		setSelectedCategories(values)
	}

	return (
		<Form {...layout} name='selectPosts' onFinish={onSubmit} layout='horizontal' form={form}>
			<Form.Item name='categories'>
				<Select mode='multiple' size='default' placeholder='Select categories' allowClear onChange={onChange}
						value={selected}>
					{categories && categories.map(e => (
						<Select.Option key={e}>{e}</Select.Option>
					))}
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

export default CategoriesSearchForm