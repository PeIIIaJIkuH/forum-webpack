import React from 'react'
import s from './Posts.module.css'
import Comment from 'antd/lib/comment'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteComment} from '../../redux/posts-reducer'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import Button from 'antd/lib/button'
import {userIDSelector} from '../../redux/selectors'

const Comments = ({comments, deleteComment, userID, userPage}) => {
	let data
	if (comments) {
		data = comments.map(comment => {
			const onDelete = () => {
				if (!userPage) {
					deleteComment(comment.id)
				} else {
					deleteComment(comment.id, comment.post_id)
				}
			}

			const onEdit = () => {

			}

			const created = getDateDifference(comment.createdAt),
				check = comment.author.id === userID,
				deleteBtn = <Button danger type='link' icon={<DeleteOutlined className={s.icon}/>}
									onClick={onDelete}/>,
				editBtn = <Button type='text' icon={<EditOutlined className={s.icon}/>} onClick={onEdit}/>

			return {
				author: comment.author,
				content: comment.content.split('\n').map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				)),
				datetime: created ?
					`${created.num} ${created.type.slice(0, -1)}${created.num > 1 ? 's' : ''} ago` : 'Just now',
				actions: check ? [editBtn, deleteBtn] : null
			}
		})
	}

	const header = (
			<div className={s.commentsTitle}>
				{`${comments ? comments.length : 'No'} comments`}
			</div>
		),
		locale = {
			emptyText: 'No Comments'
		}

	const renderItem = item => {
		const author = (
			<Link to={`/user/${item.author.id}`}>
				{item.author.username}
			</Link>
		)

		return (
			<li><Comment author={author} content={item.content} datetime={item.datetime} actions={item.actions}/></li>
		)
	}

	return <List header={!userPage ? header : null} dataSource={data} renderItem={renderItem} locale={locale}/>
}

const mapStateToProps = state => ({
	userID: userIDSelector(state)
})

const mapDispatchToProps = {
	deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)