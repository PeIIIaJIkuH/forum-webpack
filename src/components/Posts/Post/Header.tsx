import React, {FC, useState} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DeleteOutlined, EditOutlined, MoreOutlined, WarningOutlined} from '@ant-design/icons'
import {Link, useHistory} from 'react-router-dom'
import Popover from 'antd/lib/popover'
import {EUserRole, IPost} from '../../../types'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import postsState from '../../../store/postsState'
import authState from '../../../store/authState'
import {adminAPI} from '../../../api/admin'
import {moderatorAPI} from '../../../api/moderator'

type Props = {
	post: IPost
}

export const Header: FC<Props> = observer(({post}) => {
	const history = useHistory()
	const [visible, setVisible] = useState(false)
	const isAuthor = authState.user?.id === post.author.id
	const isModerator = authState.role === EUserRole.moderator
	const isAdmin = authState.role === EUserRole.admin
	const [deleteLoading, setDeleteLoading] = useState(false)
	const [reportLoading, setReportLoading] = useState(false)

	const onEdit = async () => {
		setVisible(false)
		history.push(`/edit?id=${post.id}`)
	}

	const onDelete = async (type: 'author' | 'moderator' | 'admin') => {
		setVisible(false)
		let status: boolean
		setDeleteLoading(true)
		if (type === 'author') {
			status = await postsState.deletePost(post.id)
		} else if (type === 'moderator') {
			status = (await moderatorAPI.deletePost(post.id)).status
		} else {
			status = (await adminAPI.deletePost(post.id)).status
		}
		setDeleteLoading(false)
		if (status) {
			message.success('post was deleted successfully')
			await postsState.fetchAllPosts()
		} else {
			message.error('can not delete post')
		}
	}

	const onReport = async () => {
		setVisible(false)
		setReportLoading(true)
		const {status} = await moderatorAPI.createReport(authState.user?.id!, post.id)
		setReportLoading(false)
		if (status) {
			message.success('post was reported successfully')
		} else {
			message.error('can not report post')
		}
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const content = (
		<div className={s.actions}>
			{isAuthor ? (
				<>
					<Button type='text' icon={<EditOutlined/>} onClick={onEdit}/>
					<Button danger type='link' icon={<DeleteOutlined/>} loading={deleteLoading}
					        onClick={onDelete.bind(null, 'author')}
					/>
				</>
			) : isModerator ? (
				<>
					<Button danger type='link' icon={<DeleteOutlined/>} loading={deleteLoading}
					        onClick={onDelete.bind(null, 'moderator')}
					/>
					<Button danger type='link' icon={<WarningOutlined/>} loading={reportLoading}
					        onClick={onReport}
					/>
				</>
			) : isAdmin ? (
				<Button danger type='link' icon={<DeleteOutlined/>} loading={deleteLoading}
				        onClick={onDelete.bind(null, 'admin')}
				/>
			) : null}
		</div>
	)

	return (
		<div className={s.header}>
			<Link className={s.title} to={`/post/${post.id}`}>
				{post.title}
			</Link>
			{(isAuthor || isAdmin || isModerator) && (
				<div className={s.more}>
					<Popover trigger='click' placement='left' visible={visible} onVisibleChange={handleVisibleChange}
					         content={content}
					>
						<Button type='text' icon={<MoreOutlined/>}/>
					</Popover>
				</div>
			)}
		</div>
	)
})
