import React from 'react'
import s from './Posts.module.css'
import {Button, Card, Col, Divider, Row, Tag} from 'antd'
import {CommentOutlined, DownOutlined, UpOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {getDateDifference} from '../../utils/helpers/helpers'

const Post = ({data, setRating, isAuth, isUserPage}) => {
	const created = getDateDifference(data.createdAt)

	const onClick = num => {
		setRating(data.id, num)
	}

	const isRatedUp = data.userRating === 1,
		isRatedDown = data.userRating === -1

	return (
		<Card className={s.post}>
			<Row>
				<Col className={s.rating} span={2}>
					<div>
						<Button className={`${s.up} ${isRatedUp && s.ratedUp}`}
								icon={<UpOutlined/>} disabled={!isAuth} onClick={() => {
							onClick(1)
						}}/>
						<div className={s.ratingNumber}>{data.postRating}</div>
						<Button className={`${s.down} ${isRatedDown && s.ratedDown}`}
								icon={<DownOutlined/>} disabled={!isAuth} onClick={() => {
							onClick(-1)
						}}/>
					</div>
				</Col>
				<Col span={21}>
					<Link to={`/post/${data.id}`} className={s.title}>
						{data.title}
					</Link>
					<div className={s.content}>
						{data.content.split('\n').map((paragraph, i) => (
							<p key={i}>{paragraph}</p>
						))}
					</div>
					<Divider className={s.divider}/>
					{data.categories &&
					<div className={s.categories}>
						{data.categories.map(category => (
							<Tag key={category.id}>{category.name}</Tag>
						))}
					</div>}
					<div className={s.bottom}>
						<div className={s.author}>
							<Link to={`/user/${data.author.id}`} disabled={isUserPage}>
								{data.author.username}
							</Link>
						</div>
						<div className={s.created}>
							{created ? `${created.num} ${created.type.slice(0, -1)}${created.num > 1 ? 's' : ''} ago` : 'Just now'}
						</div>
						<div className={s.comments}>
							<CommentOutlined/>
						</div>
					</div>
				</Col>
			</Row>
		</Card>
	)
}

export default Post