import React from 'react'
import {connect} from 'react-redux'
import s from './Actions.module.css'
import CategoriesSearchForm from './CategoriesSearchForm'
import Card from 'antd/lib/card'
import {notificationType, openNotification} from '../../utils/helpers/helpers'
import {categoriesSelector, selectedCategoriesSelector} from '../../redux/selectors'
import {requestCategories, setSelectedCategories} from '../../redux/categories-reducer'
import {requestPostsByCategories} from '../../redux/posts-reducer'
import {setMenuOpen} from '../../redux/app-reducer'
import Form from 'antd/lib/form'

const CategoriesSearch = ({
							  categories, requestCategories, requestPostsByCategories, closeModal, setMenuOpen,
							  mobile, selected, setSelectedCategories
						  }) => {
	const [isFetching, setIsFetching] = React.useState(false),
		[form] = Form.useForm()

	const onSubmit = async ({categories}) => {
		if (mobile) {
			closeModal()
		}
		setMenuOpen(false)
		if (!categories || !categories.length) {
			openNotification(notificationType.WARNING, 'Choose at least one category!')
		} else {
			form.resetFields()
			setIsFetching(true)
			await requestPostsByCategories(categories)
			setIsFetching(false)
		}
	}

	return (
		<Card className={s.card}>
			<CategoriesSearchForm onSubmit={onSubmit} categories={categories} requestCategories={requestCategories}
								  isFetching={isFetching} selected={selected} form={form}
								  setSelectedCategories={setSelectedCategories}/>
		</Card>
	)
}

const mapStateToProps = state => ({
	categories: categoriesSelector(state),
	selected: selectedCategoriesSelector(state)
})

const mapDispatchToProps = {
	requestCategories,
	requestPostsByCategories,
	setMenuOpen,
	setSelectedCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSearch)