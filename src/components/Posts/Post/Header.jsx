import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import history from '../../../history'
import {DeleteOutlined, EditOutlined, MoreOutlined} from '@ant-design/icons'
import {notificationType, openNotification} from '../../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import Popover from 'antd/lib/popover'

const Header = ({post, userID, deletePost, setPostToEdit, postPage}) => {
	const [loading, setLoading] = React.useState(false),
		[visible, setVisible] = React.useState(false)

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
		setVisible(false)
	}

	const onEdit = async () => {
		await setPostToEdit(post)
		setVisible(false)
		history.push('/edit')
	}

	const handleVisibleChange = visible => {
		setVisible(visible)
	}

	return (
		<div className={s.header}>
			<Link className={s.title} to={`/post/${post.id}`}>
				{post.title}
			</Link>
			{userID === post.author.id && (
				<div className={s.more}>
					<Popover trigger='click' placement='bottom' visible={visible} onVisibleChange={handleVisibleChange}
							 content={(
								 <div className={s.actions}>
									 <Button type='text' icon={<EditOutlined/>} onClick={onEdit}/>
									 <Button danger type='link' icon={<DeleteOutlined/>} onClick={onDelete}
											 loading={loading}/>
								 </div>
							 )}>
						<Button type='text' icon={<MoreOutlined/>}/>
					</Popover>
				</div>
			)}
		</div>
	)
}

export default Header