import React from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import Tooltip from 'antd/lib/tooltip'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import ActionsForm from './ActionsForm'
import {getCategoriesSelector, getIsAuthSelector} from '../../redux/selectors'
import {requestCategories} from '../../redux/categories-reducer'
import {connect} from 'react-redux'
import {requestPostsByCategories} from '../../redux/posts-reducer'
import {toast} from 'react-toastify'
import Layout from 'antd/lib/layout'
import {toastOptions} from '../../utils/helpers/helpers'
import Affix from 'antd/lib/affix'

const Actions = ({isAuth, categories, requestCategories, requestPostsByCategories}) => {
	const [isFetching, setIsFetching] = React.useState(false)

	const onSubmit = async ({categories}) => {
		if (!categories || !categories.length) {
			toast.error('You should choose at least one category!', toastOptions)
		} else {
			setIsFetching(true)
			await requestPostsByCategories(categories)
			setIsFetching(false)
		}
	}

	const button = (
		<Link className={s.addPost} to='/create'>
			<Button type='primary' icon={<PlusOutlined/>} disabled={!isAuth}>
				Add post
			</Button>
		</Link>
	)

	return (
		<Affix offsetTop={104}>
			<div>
				{isAuth ? button :
					<Tooltip title='Only for authorized users.' placement='bottom'>
						{button}
					</Tooltip>}
				<Card className={s.card}>
					<ActionsForm onSubmit={onSubmit} categories={categories} requestCategories={requestCategories}
								 isFetching={isFetching}/>
				</Card>
				<Layout.Footer className={s.footer}>
					<div>by PeIIIaJIkuH and indecember</div>
					<div>GO, React, SQLite3</div>
					<div>February, 2021</div>
				</Layout.Footer>
			</div>
		</Affix>
	)
}

const mapStateToProps = state => ({
	isAuth: getIsAuthSelector(state),
	categories: getCategoriesSelector(state)
})

const mapDispatchToProps = {
	requestCategories,
	requestPostsByCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)