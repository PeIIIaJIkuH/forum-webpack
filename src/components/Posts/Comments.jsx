import React from 'react'
import s from './Posts.module.css'
import Comment from 'antd/lib/comment'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers/helpers'
import {Link} from 'react-router-dom'

const Comments = ({comments}) => {
	let data
	if (comments) {
		data = comments.map(comment => {
			const created = getDateDifference(comment.createdAt)
			return {
				author: comment.author,
				content: comment.content.split('\n').map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				)),
				datetime: created ?
					`${created.num} ${created.type.slice(0, -1)}${created.num > 1 ? 's' : ''} ago` : 'Just now'
			}
		})
	}

	const header = (
		<div className={s.commentsTitle}>
			{`${comments ? comments.length : 'No'} comments`}
		</div>
	)

	const renderItem = item => {
		const author = (
			<Link to={`/user/${item.author.id}`}>
				{item.author.username}
			</Link>
		)

		return (
			<li>
				<Comment author={author} content={item.content} datetime={item.datetime}/>
			</li>
		)
	}

	return (
		<List header={header} dataSource={data} renderItem={renderItem}/>
	)
}

export default Comments