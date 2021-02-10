import React from 'react'
import s from '../Posts.module.css'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import {DownOutlined, UpOutlined} from '@ant-design/icons'

const Rate = ({isAuth, setRating, post}) => {
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

	const onClick = num => {
		setRating(post.id, num)
	}

	return (
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
	)
}

export default Rate