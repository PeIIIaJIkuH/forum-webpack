import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import history from '../../../history'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

const Header = ({post, userID, deletePost}) => {
	return (
		<div className={s.header}>
			<Button className={s.title} type='text' onClick={() => {
				history.push(`/post/${post.id}`)
			}}>
				{post.title}
			</Button>
			{userID === post.author.id && (
				<div>
					<Button className={s.edit} type='text' icon={<EditOutlined/>}/>
					<Button danger type='link' icon={<DeleteOutlined/>} onClick={() => {
						deletePost(post.id)
					}}/>
				</div>
			)}
		</div>
	)
}

export default Header