import React, {FC, useEffect} from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Form, {FormInstance} from 'antd/lib/form'
import Select from 'antd/lib/select'
import {FilterOutlined} from '@ant-design/icons'
import {requestCategories, setSelectedCategories} from '../../redux/categories-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {categoriesSelector} from '../../redux/selectors'

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

type Props = {
	isFetching: boolean
	onSubmit: (obj: { categories: string[] }) => Promise<void>
	form: FormInstance
}

const CategoriesSearchForm: FC<Props> = ({onSubmit, form, isFetching}) => {
	const categories = useSelector(categoriesSelector)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(requestCategories())
	}, [dispatch])

	const onChange = (values: string[]) => {
		dispatch(setSelectedCategories(values))
	}

	return <>
		<Form {...layout} name='selectPosts' onFinish={onSubmit} layout='horizontal' form={form}>
			<Form.Item name='categories'>
				<Select mode='multiple' placeholder='Select categories' allowClear onChange={onChange}>
					{categories?.map(e => (
						<Select.Option key={e.name} value={e.name}>{e.name}</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item {...tailLayout} className={s.btnWrapper}>
				<Button type='default' htmlType='submit' icon={<FilterOutlined/>} loading={isFetching}>
					Filter
				</Button>
			</Form.Item>
		</Form>
	</>
}

export default CategoriesSearchForm