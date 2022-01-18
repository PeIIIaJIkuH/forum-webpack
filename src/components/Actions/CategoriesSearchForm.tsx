import React, {FC, useEffect} from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Form, {FormInstance} from 'antd/lib/form'
import Select from 'antd/lib/select'
import {FilterOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'

const layout = {
	wrapperCol: {
		span: 24,
	},
}

const tailLayout = {
	wrapperCol: {
		span: 24,
	},
}

type Props = {
	isFetching: boolean
	onSubmit: (obj: { categories: string[] }) => Promise<void>
	form: FormInstance
}

export const CategoriesSearchForm: FC<Props> = observer(({onSubmit, form, isFetching}) => {
	useEffect(() => {
		postsState.fetchAllCategories().then()
	}, [])

	return (
		<Form {...layout} name='selectPosts' onFinish={onSubmit} layout='horizontal' form={form}>
			<Form.Item name='categories'>
				<Select mode='multiple' placeholder='Select categories' allowClear>
					{postsState.allCategories?.map(({id, name}) => (
						<Select.Option key={id} value={name}>{name}</Select.Option>
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
})
