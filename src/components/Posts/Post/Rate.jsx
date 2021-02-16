import React from 'react'
import s from '../Posts.module.css'
import Button from 'antd/lib/button'
import {DownOutlined, UpOutlined} from '@ant-design/icons'
import {notificationType, openNotification} from '../../../utils/helpers/helpers'

const Rate = ({isAuth, setRating, post}) => {
	const isRatedUp = post.userRating === 1,
		isRatedDown = post.userRating === -1,
		[upLoading, setUpLoading] = React.useState(false),
		[downLoading, setDownLoading] = React.useState(false),
		upRef = React.useRef(null),
		downRef = React.useRef(null)

	const onUpClick = async () => {
		setUpLoading(true)
		const ok = await setRating(post.id, 1)
		upRef.current.blur()
		setUpLoading(false)
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not rate post!')
		}
	}

	const onDownClick = async () => {
		setDownLoading(true)
		const ok = await setRating(post.id, -1)
		downRef.current.blur()
		setDownLoading(false)
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not rate post!')
		}
	}

	return (
		<div>
			<Button className={`${s.up} ${isRatedUp && s.ratedUp}`} icon={<UpOutlined/>} ref={upRef}
					disabled={!isAuth} onClick={onUpClick} loading={upLoading}/>
			<div className={s.ratingNumber}>{post.postRating}</div>
			<Button className={`${s.down} ${isRatedDown && s.ratedDown}`} icon={<DownOutlined/>} ref={downRef}
					disabled={!isAuth} onClick={onDownClick} loading={downLoading}/>
		</div>
	)
}

export default Rate