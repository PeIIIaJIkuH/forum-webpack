import React from 'react'
import s from './Posts.module.css'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userIDSelector} from '../../redux/selectors'
import Comment from './Comment'

const Comments = ({comments, userID, userPage}) => {
	const data = comments ? comments.map((comment, i) => {
		const created = getDateDifference(comment.createdAt),
			check = comment.author.id === userID

		return {
			author: comment.author,
			content: comment.content,
			datetime: created ?
				`${created.num}${created.type}` : 'Just now',
			comment: comment,
			check: check
		}
	}) : undefined

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
			<li>
				<Comment author={author} content={item.content} datetime={item.datetime} comment={item.comment}
						 check={item.check} userPage={userPage}/>
			</li>
		)
	}

	return <List header={!userPage ? header : null} dataSource={data} renderItem={renderItem} locale={locale}/>
}

const mapStateToProps = state => ({
	userID: userIDSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)