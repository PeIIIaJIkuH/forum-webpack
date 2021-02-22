import React, {FC} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import history from '../../../history'
import {DeleteOutlined, EditOutlined, MoreOutlined} from '@ant-design/icons'
import {notificationType, openNotification} from '../../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import Popover from 'antd/lib/popover'
import {TPost} from '../../../types/types'
import {DeletePost, SetPostToEdit} from '../../../redux/posts-reducer'

type Props = {
	post: TPost
	userID: number | null
	deletePost: DeletePost
	setPostToEdit: SetPostToEdit
	postPage?: boolean
}

const Header: FC<Props> = ({post, userID, deletePost, setPostToEdit, postPage}) => {
	const [loading, setLoading] = React.useState(false),
		[visible, setVisible] = React.useState(false)

	const onDelete = async () => {
		setVisible(false)
		setLoading(true)
		const ok: any = await deletePost(post.id)
		if (ok) {
			if (postPage) {
				history.push('/')
			}
		} else {
			setLoading(false)
			openNotification(notificationType.ERROR, 'Can not delete post!')
		}
	}

	const onEdit = async () => {
		await setPostToEdit(post)
		setVisible(false)
		history.push('/edit')
	}

	const handleVisibleChange = (visible: boolean) => {
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