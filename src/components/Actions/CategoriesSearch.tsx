import React, {FC} from 'react'
import {connect} from 'react-redux'
import s from './Actions.module.css'
import CategoriesSearchForm from './CategoriesSearchForm'
import Card from 'antd/lib/card'
import {categoriesSelector, selectedCategoriesSelector} from '../../redux/selectors'
import {
	RequestCategories,
	requestCategories,
	SetSelectedCategories,
	setSelectedCategories
} from '../../redux/categories-reducer'
import {RequestPostsByCategories, requestPostsByCategories} from '../../redux/posts-reducer'
import {SetMenuOpen, setMenuOpen} from '../../redux/app-reducer'
import Form from 'antd/lib/form'
import {State} from '../../redux/store'
import {Category} from '../../types/types'
import message from 'antd/lib/message'

type OwnProps = {
	closeModal?: () => void
	mobile?: boolean
}

type Props = OwnProps & MapStateToProps & MapDispatchToProps

const CategoriesSearch: FC<Props> = ({
										 categories, requestCategories, requestPostsByCategories,
										 closeModal, setMenuOpen, mobile,
										 selected, setSelectedCategories
									 }) => {
	const [isFetching, setIsFetching] = React.useState(false),
		[form] = Form.useForm()

	type obj = {
		categories: string[]
	}
	const onSubmit = async ({categories}: obj) => {
		if (mobile && closeModal) {
			closeModal()
		}
		setMenuOpen(false)
		if (!categories || !categories.length) {
			message.warning('Choose at least one category!')
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

type MapStateToProps = {
	categories: Category[] | null
	selected: string[] | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	categories: categoriesSelector(state),
	selected: selectedCategoriesSelector(state)
})

type MapDispatchToProps = {
	requestCategories: RequestCategories
	requestPostsByCategories: RequestPostsByCategories
	setMenuOpen: SetMenuOpen
	setSelectedCategories: SetSelectedCategories
}
const mapDispatchToProps: MapDispatchToProps = {
	requestCategories,
	requestPostsByCategories,
	setMenuOpen,
	setSelectedCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSearch)