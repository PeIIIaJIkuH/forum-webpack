import React, {FC} from 'react'
import s from './AdminDashboard.module.css'
import adminState from '../../store/adminState'
import {Link} from 'react-router-dom'
import Button from 'antd/lib/button'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {adminAPI} from '../../api/admin'
import message from 'antd/lib/message'
import Empty from 'antd/lib/empty'
import Card from 'antd/lib/card'

export const Reports: FC = () => {
	const onAccept = async (id: number) => {
		const {status} = await adminAPI.acceptPostReport(id)
		if (status) {
			message.success('report was accepted successfully')
			adminState.setReports([])
			await adminState.fetchReports()
		} else {
			message.error('can not accept report')
		}
	}

	const onDismiss = async (id: number) => {
		const {status} = await adminAPI.dismissPostReport(id)
		if (status) {
			message.success('report was dismissed successfully')
			adminState.setReports([])
			await adminState.fetchReports()
		} else {
			message.error('can not dismiss report')
		}
	}

	return adminState.reports.length ? (
		<div className={s.grid}>
			{adminState.reports.map(({id, post_title: title, postID: postId}) => (
				<div key={id} className={s.card}>
					<Link to={`/post/${postId}`}>
						{title}
					</Link>
					<div>
						<Button icon={<CloseOutlined/>} danger className={s.close} type='link'
						        onClick={onDismiss.bind(null, id)}
						/>
						<Button icon={<CheckOutlined/>} type='link' onClick={onAccept.bind(null, id)}/>
					</div>
				</div>
			))}
		</div>
	) : (
		<Card>
			<Empty className={s.empty} description='No Reports'/>
		</Card>
	)
}
