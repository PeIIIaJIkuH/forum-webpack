import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import history from '../../../history'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

const Header = ({post, userID, deletePost, onEdit, postPage}) => {
	const onClick = () => {
		history.push(`/post/${post.id}`)
	}

	const onDelete = () => {
		deletePost(post.id)
		if (postPage) {
			history.push('/')
		}
	}

	return (
		<div className={s.header}>
			<Button className={s.title} type='text' onClick={onClick}>
				{post.title}
			</Button>
			{userID === post.author.id && (
				<div>
					<Button className={s.edit} type='text' icon={<EditOutlined/>} onClick={onEdit}/>
					<Button danger type='link' icon={<DeleteOutlined/>} onClick={onDelete}/>
				</div>
			)}
		</div>
	)
}

export default Header