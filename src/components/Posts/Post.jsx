import React from 'react'
import s from './Posts.module.css'
import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Card from 'antd/lib/card'
import Tooltip from 'antd/lib/tooltip'
import Divider from 'antd/lib/divider'
import Tag from 'antd/lib/tag'
import {CommentOutlined, DeleteOutlined, DownOutlined, EditOutlined, UpOutlined} from '@ant-design/icons'
import {getDateDifference} from '../../utils/helpers/helpers'
import history from '../../history'

const Post = ({post, setRating, isAuth, isUserPage, requestPostsByCategories, userID, deletePost}) => {
	const created = getDateDifference(post.createdAt)

	const onClick = num => {
		setRating(post.id, num)
	}

	const isRatedUp = post.userRating === 1,
		isRatedDown = post.userRating === -1

	const upVoteButton = (
		<Button className={`${s.up} ${isRatedUp && s.ratedUp}`}
				icon={<UpOutlined/>} disabled={!isAuth} onClick={() => {
			onClick(1)
		}}/>
	)
	const downVoteButton = (
		<Button className={`${s.down} ${isRatedDown && s.ratedDown}`}
				icon={<DownOutlined/>} disabled={!isAuth} onClick={() => {
			onClick(-1)
		}}/>
	)

	return (
		<Card className={s.post}>
			<Row>
				<Col className={s.rating} span={2}>
					<div>
						{isAuth ? upVoteButton :
							<Tooltip title='Only for authorized users.' placement='bottom'>
								{upVoteButton}
							</Tooltip>
						}
						<div className={s.ratingNumber}>{post.postRating}</div>
						{isAuth ? downVoteButton :
							<Tooltip title='Only for authorized users.' placement='bottom'>
								{downVoteButton}
							</Tooltip>
						}
					</div>
				</Col>
				<Col span={21}>
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
					<div className={s.content}>
						{post.content.split('\n').map((paragraph, i) => (
							<p key={i}>{paragraph}</p>
						))}
					</div>
					<Divider className={s.divider}/>
					{post.categories &&
					<div className={s.categories}>
						{post.categories.map(category => (
							<Tag className={s.tag} key={category.id} onClick={() => {
								requestPostsByCategories([category.name])
							}}>
								{category.name}
							</Tag>
						))}
					</div>}
					<div className={s.bottom}>
						<div className={s.author}>
							<Button className={s.user} type='text' disabled={isUserPage} onClick={() => {
								history.push(`/user/${post.author.id}`)
							}}>
								{post.author.username}
							</Button>
						</div>
						<div>
							{created ? `${created.num} ${created.type.slice(0, -1)}${created.num > 1 ? 's' : ''} ago` : 'Just now'}
						</div>
						<Button type='text' onClick={() => {
							history.push(`/post/${post.id}`)
						}}>
							<span>{post && post.commentsNumber}</span>
							<CommentOutlined/>
						</Button>
					</div>
				</Col>
			</Row>
		</Card>
	)
}

export default Post