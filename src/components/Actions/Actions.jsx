import React from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {isAuthSelector, postToEditSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import Layout from 'antd/lib/layout'
import CategoriesSearch from './CategoriesSearch'

const Actions = ({isAuth, postToEdit}) => {
	const disabled = !isAuth || postToEdit

	return (
		<div className='actions'>
			<Link className={s.addPost} to='/create'>
				<Button type='primary' icon={<PlusOutlined/>} disabled={disabled}>
					Add post
				</Button>
			</Link>
			<CategoriesSearch/>
			<Layout.Footer className={s.footer}>
				<div>by PeIIIaJIkuH and indecember</div>
				<div>GO, React, SQLite3</div>
				<div>February, 2021</div>
			</Layout.Footer>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuth: isAuthSelector(state),
	postToEdit: postToEditSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)