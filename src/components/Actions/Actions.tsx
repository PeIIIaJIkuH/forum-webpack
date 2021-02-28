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

type OwnProps = {
	isAuth: boolean
	postToEdit: TPost | null
}

type Props = OwnProps & MapStateToProps & MapDispatchToProps

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

type MapStateToProps = {
	isAuth: boolean
	postToEdit: TPost | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state),
	postToEdit: postToEditSelector(state)
})

type MapDispatchToProps = {}
const mapDispatchToProps: MapDispatchToProps = {}

export default connect<MapStateToProps, MapDispatchToProps, unknown, State>(mapStateToProps, mapDispatchToProps)(Actions)