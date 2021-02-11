import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DownOutlined, UpOutlined} from '@ant-design/icons'

const Rate = ({isAuth, setRating, post}) => {
	const isRatedUp = post.userRating === 1,
		isRatedDown = post.userRating === -1

	const onClick = num => {
		setRating(post.id, num)
	}

	return (
		<div>
			<Button className={`${s.up} ${isRatedUp && s.ratedUp}`}
					icon={<UpOutlined/>} disabled={!isAuth} onClick={() => onClick(1)}/>
			<div className={s.ratingNumber}>{post.postRating}</div>
			<Button className={`${s.down} ${isRatedDown && s.ratedDown}`}
					icon={<DownOutlined/>} disabled={!isAuth} onClick={() => onClick(-1)}/>
		</div>
	)
}

export default Rate