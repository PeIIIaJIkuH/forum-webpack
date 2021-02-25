import React, {FC} from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {isAuthSelector, postToEditSelector} from '../../redux/selectors'
import {connect} from 'react-redux'
import Layout from 'antd/lib/layout'
import CategoriesSearch from './CategoriesSearch'
import {TPost} from '../../types/types'
import {State} from '../../redux/store'

type Props = {
	isAuth: boolean
	postToEdit: TPost | null
}

const Actions: FC<Props> = ({isAuth, postToEdit}) => {
	return <>
		<div className='actions'>
			<Link className={s.addPost} to='/create'>
				<Button type='primary' icon={<PlusOutlined/>} disabled={!isAuth || !!postToEdit}>
					Add post
				</Button>
			</Link>
			<div className={s.wrapper}>
				<CategoriesSearch/>
			</div>
			<Layout.Footer className={s.footer}>
				<div>by PeIIIaJIkuH and indecember</div>
				<div>GO, React, SQLite3</div>
				<div>February, 2021</div>
			</Layout.Footer>
		</div>
	</>
}

const mapStateToProps = (state: State) => ({
	isAuth: isAuthSelector(state),
	postToEdit: postToEditSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)