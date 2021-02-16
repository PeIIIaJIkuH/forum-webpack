import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import history from '../../../history'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {notificationType, openNotification} from '../../../utils/helpers/helpers'

const Header = ({post, userID, deletePost, setPostToEdit, postPage}) => {
	const [loading, setLoading] = React.useState(false)

	const onClick = () => {
		history.push(`/post/${post.id}`)
	}

	const onDelete = async () => {
		setLoading(true)
		const ok = await deletePost(post.id)
		setLoading(false)
		if (ok) {
			if (postPage) {
				history.push('/')
			}
		} else {
			openNotification(notificationType.ERROR, 'Can not delete post!')
		}
	}

	const onEdit = async () => {
		await setPostToEdit(post)
		history.push('/edit')
	}

	return (
		<div className={s.header}>
			<Button className={s.title} type='text' onClick={onClick}>
				{post.title}
			</Button>
			{userID === post.author.id && (
				<div>
					<Button className={s.edit} type='text' icon={<EditOutlined/>} onClick={onEdit}/>
					<Button danger type='link' icon={<DeleteOutlined/>} onClick={onDelete} loading={loading}/>
				</div>
			)}
		</div>
	)
}

export default Header