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
import history from '../../history'
import {toast} from 'react-toastify'
import Layout from 'antd/lib/layout'

toast.configure()

const Actions = ({isAuth, categories, requestCategories, requestPostsByCategories}) => {
	const onSubmit = async ({categories}) => {
		if (!categories || !categories.length) {
			toast.error('You should choose at least one category!', {position: toast.POSITION.BOTTOM_RIGHT})
		} else {
			await requestPostsByCategories(categories)
			history.push('/by-categories')
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
		<>
			{isAuth ? button :
				<Tooltip title='Only for authorized users.' placement='bottom'>
					{button}
				</Tooltip>}
			<Card className={s.card}>
				<ActionsForm onSubmit={onSubmit} categories={categories} requestCategories={requestCategories}/>
			</Card>
			<Layout.Footer className={s.footer}>
				<div>by PeIIIaJIkuH and indecember</div>
				<div>GO, React, SQLite3</div>
				<div>February, 2021</div>
			</Layout.Footer>
		</>
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