import React from 'react'
import {connect} from 'react-redux'
import s from './Actions.module.css'
import ActionsForm from './ActionsForm'
import Card from 'antd/lib/card'
import {notificationType, openNotification} from '../../utils/helpers/helpers'
import {categoriesSelector} from '../../redux/selectors'
import {requestCategories} from '../../redux/categories-reducer'
import {requestPostsByCategories} from '../../redux/posts-reducer'
import {setMenuOpen} from '../../redux/app-reducer'

const CategoriesSearch = ({
							  categories, requestCategories, requestPostsByCategories, closeModal, setMenuOpen,
							  mobile
						  }) => {
	const [isFetching, setIsFetching] = React.useState(false)

	const onSubmit = async ({categories}) => {
		if (mobile) {
			closeModal()
		}
		setMenuOpen(false)
		if (!categories || !categories.length) {
			openNotification(notificationType.WARNING, 'Choose at least one category!')
		} else {
			setIsFetching(true)
			await requestPostsByCategories(categories)
			setIsFetching(false)
		}
	}

	return (
		<Card className={s.card}>
			<ActionsForm onSubmit={onSubmit} categories={categories} requestCategories={requestCategories}
						 isFetching={isFetching}/>
		</Card>
	)
}

const mapStateToProps = state => ({
	categories: categoriesSelector(state)
})

const mapDispatchToProps = {
	requestCategories,
	requestPostsByCategories,
	setMenuOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSearch)