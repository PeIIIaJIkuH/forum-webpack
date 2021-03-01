import React, {FC, useRef, useState} from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DownOutlined, UpOutlined} from '@ant-design/icons'
import {SetRating} from '../../../redux/posts-reducer'
import {TPost} from '../../../types/types'
import message from 'antd/lib/message'

type Props = {
	isAuth: boolean
	setRating: SetRating
	post: TPost
}

export const Rate: FC<Props> = ({isAuth, setRating, post}) => {
	const isRatedUp = post.userRating === 1,
		isRatedDown = post.userRating === -1,
		[upLoading, setUpLoading] = useState(false),
		[downLoading, setDownLoading] = useState(false),
		upRef = useRef<HTMLDivElement>(null),
		downRef = useRef<HTMLDivElement>(null)

	const onUpClick = () => {
		setUpLoading(true)
		const ok: any = setRating(post.id, 1)
		if (upRef.current)
			upRef.current.blur()
		setUpLoading(false)
		if (!ok)
			message.error('Can not rate post!')
	}

	const onDownClick = () => {
		setDownLoading(true)
		const ok: any = setRating(post.id, -1)
		if (downRef.current)
			downRef.current.blur()
		setDownLoading(false)
		if (!ok)
			message.error('Can not rate post!')
	}

	return <>
		<div className={s.rating}>
			<Button className={`${s.up} ${isRatedUp && s.ratedUp}`} icon={<UpOutlined/>} ref={upRef}
					disabled={!isAuth} onClick={onUpClick} loading={upLoading}/>
			<div className={s.ratingNumber}>
				{post.postRating}
			</div>
			<Button className={`${s.down} ${isRatedDown && s.ratedDown}`} icon={<DownOutlined/>} ref={downRef}
					disabled={!isAuth} onClick={onDownClick} loading={downLoading}/>
		</div>
	</>
}