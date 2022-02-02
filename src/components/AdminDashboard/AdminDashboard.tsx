import React, {FC, useEffect} from 'react'
import Tabs from 'antd/lib/tabs'
import {Helmet} from 'react-helmet'
import s from './AdminDashboard.module.css'
import adminState from '../../store/adminState'
import authState from '../../store/authState'
import {Error403} from '../common/errors/Error403'
import {observer} from 'mobx-react-lite'
import {Requests} from './Requests'
import {EUserRole} from '../../types'
import {Reports} from './Reports'
import {Categories} from './Categories'
import {Moderators} from './Moderators'

const {TabPane} = Tabs

export const AdminDashboard: FC = observer(() => {
	const getTab = (name: string) => (
		<div className={s.tab}>
			{name}
		</div>
	)

	useEffect(() => {
		adminState.fetchAll().then()
	}, [])

	if (!authState.user || authState.role !== EUserRole.admin) {
		return <Error403/>
	}

	return (
		<div>
			<Helmet><title>Admin Dashboard | forume</title></Helmet>
			<Tabs centered>
				<TabPane tab={getTab('Requests')} key='requests'>
					<Requests/>
				</TabPane>
				<TabPane tab={getTab('Reports')} key='reports'>
					<Reports/>
				</TabPane>
				<TabPane tab={getTab('Moderators')} key='moderators'>
					<Moderators/>
				</TabPane>
				<TabPane tab={getTab('Categories')} key='categories'>
					<Categories/>
				</TabPane>
			</Tabs>
		</div>
	)
})
