import React from 'react'
import s from './Posts.module.css'
import {Button, Card, Col, Divider, Row} from 'antd'
import moment from 'moment'
import {CommentOutlined, DownOutlined, UpOutlined} from '@ant-design/icons'

const Post = ({data, setRating, isAuth}) => {
	console.log(data)
	const date = moment(new Date(data.createdAt * 1000))
	const now = moment()
	const arr = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'].map(e => ({
		num: now.diff(date, e),
		type: e
	}))
	const created = arr.find(e => {
		if (e.num > 0) return `${+e.num} ${e.type}`
		return false
	})

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
					<div className={s.title}>
						{data.title}
					</div>
					<p className={s.content}>
						{data.content}
					</p>
					<Divider/>
					<div className={s.bottom}>
						<div className={s.author}>
							{data.author.username}
						</div>
						<div className={s.created}>
							{created ? `${created.num} ${created.type.slice(0, -1)}${created.num > 1 && '(s)'} ago` : 'Just now'}
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