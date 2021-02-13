import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DownOutlined, UpOutlined} from '@ant-design/icons'

const Rate = ({isAuth, setRating, post}) => {
	const isRatedUp = post.userRating === 1,
		isRatedDown = post.userRating === -1

	const onUpClick = () => {
		setRating(post.id, 1)
	}

	const onDownClick = () => {
		setRating(post.id, -1)
	}

	return (
		<div>
			<Button className={`${s.up} ${isRatedUp && s.ratedUp}`}
					icon={<UpOutlined/>} disabled={!isAuth} onClick={onUpClick}/>
			<div className={s.ratingNumber}>{post.postRating}</div>
			<Button className={`${s.down} ${isRatedDown && s.ratedDown}`}
					icon={<DownOutlined/>} disabled={!isAuth} onClick={onDownClick}/>
		</div>
	)
}

export default Rate