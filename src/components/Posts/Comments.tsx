import React, {FC} from 'react'
import s from './Posts.module.css'
import List from 'antd/lib/list'
import {getDateDifference} from '../../utils/helpers/helpers'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userIDSelector} from '../../redux/selectors'
import Comment from './Comment'
import {State} from '../../redux/store'
import {TComment, TUser} from '../../types/types'

type OwnProps = {
	userID: number | null
	comments: TComment[] | null
	userPage?: boolean
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps

const Comments: FC<Props> = ({comments, userID, userPage}) => {
	const data = comments ? comments.map(comment => {
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

	const header = <>
		<div className={s.commentsTitle}>
			{`${comments ? comments.length : 'No'} comments`}
		</div>
	</>

	type obj = {
		author: TUser
		content: string
		datetime: string
		comment: TComment
		check: boolean
	}
	const renderItem = (item: obj) => {
		const author = <>
			<Link to={`/user/${item.author.id}`}>
				{item.author.username}
			</Link>
		</>

		return <li>
			<Comment author={author} content={item.content} datetime={item.datetime} comment={item.comment}
					 check={item.check} userPage={userPage}/>
		</li>
	}

	return <List header={!userPage ? header : null} dataSource={data} renderItem={renderItem}
				 locale={{emptyText: 'No Comments'}}/>
}

type MapStateToProps = {
	userID: number | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	userID: userIDSelector(state)
})

type MapDispatchToProps = {}
const mapDispatchToProps: MapDispatchToProps = {}

export default connect<MapStateToProps, MapDispatchToProps, unknown, State>(mapStateToProps, mapDispatchToProps)(Comments)