import React, {FC, useState} from 'react'
import {useDispatch} from 'react-redux'
import s from './Actions.module.css'
import {CategoriesSearchForm} from './CategoriesSearchForm'
import Card from 'antd/lib/card'
import {setMenuOpen} from '../../redux/app-reducer'
import message from 'antd/lib/message'
import {useForm} from 'antd/lib/form/Form'
import {useHistory} from 'react-router-dom'
import {categoriesQuery} from '../../utils/helpers/helpers'

type Props = {
	closeModal?: () => void
	mobile?: boolean
}

export const CategoriesSearch: FC<Props> = ({closeModal, mobile}) => {
	const dispatch = useDispatch(),
		history = useHistory()

	const [isFetching, setIsFetching] = useState(false),
		[form] = useForm()

	type obj = { categories: string[] }
	const onSubmit = async ({categories}: obj) => {
		if (mobile && closeModal)
			closeModal()
		dispatch(setMenuOpen(false))
		if (!categories || !categories.length)
			message.warning('Choose at least one category!')
		else {
			form.resetFields()
			setIsFetching(true)
			const query = categoriesQuery(categories)
			history.push(`/by-categories?${query}`)
			setIsFetching(false)
		}
	}

	return <>
		<Card className={s.card}>
			<CategoriesSearchForm onSubmit={onSubmit} form={form} isFetching={isFetching}/>
		</Card>
	</>
}
