import React, {ChangeEvent, Dispatch, FC, ReactNode, useRef, useState} from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, SaveOutlined, UpOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import Popover from 'antd/lib/popover'
import {TComment} from '../../types/types'
import message from 'antd/lib/message'
import {deleteComment, editComment, setCommentRating} from '../../redux/comments-reducer'

type Props = {
	author: ReactNode
	content: string
	datetime: ReactNode
	comment: TComment
	check: boolean
	userPage?: boolean
	isAuth: boolean
	dispatch: Dispatch<any>
}

export const Comment: FC<Props> = ({
									   author, content,
									   datetime, comment,
									   check, userPage, isAuth, dispatch
								   }) => {
	const [isEdit, setIsEdit] = useState(false),
		[text, setText] = useState(content),
		[deleteLoading, setDeleteLoading] = useState(false),
		[editLoading, setEditLoading] = useState(false),
		[visible, setVisible] = useState(false)

	const paragraphs = content.split('\n').map((paragraph: string, i: number) => (<p key={i}>{paragraph}</p>))

	const onDelete = async () => {
		let ok: any
		await setDeleteLoading(true)
		if (!userPage)
			ok = await dispatch(deleteComment(comment.id))
		else
			ok = await dispatch(deleteComment(comment.id, comment.post_id))
		try {
			await setDeleteLoading(false)
			await setVisible(false)
		} catch (e) {
		}
		if (!ok)
			message.error('Can not delete comment!')
	}

	const onEdit = async () => {
		let ok: any = true
		if (!isEdit)
			await setIsEdit(true)
		else {
			await setEditLoading(true)
			if (!userPage)
				ok = await editComment(comment.id, comment.author.id, comment.post_id, text, false)
			else
				ok = await editComment(comment.id, comment.author.id, comment.post_id, text, true)
			await setEditLoading(false)
			await setIsEdit(false)
		}
		if (!ok)
			message.error('Can not edit comment!')
	}

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.currentTarget.value)
	}

	const edit = <EditOutlined className={s.icon}/>,
		save = <SaveOutlined className={s.icon}/>

	const editBtn = <Button type='text' icon={!isEdit ? edit : save} onClick={onEdit} loading={editLoading}/>,
		deleteBtn = <Button danger type='text' icon={<DeleteOutlined className={s.icon}/>} onClick={onDelete}
							loading={deleteLoading}/>,
		cContent = !isEdit ? paragraphs :
			<TextArea autoSize={{minRows: 1, maxRows: 5}} defaultValue={content} onChange={onChange} allowClear
					  autoFocus/>

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	const isRatedUp = comment.userRating === 1,
		isRatedDown = comment.userRating === -1,
		[upLoading, setUpLoading] = useState(false),
		[downLoading, setDownLoading] = useState(false),
		upRef = useRef<HTMLDivElement>(null),
		downRef = useRef<HTMLDivElement>(null)

	const onUpClick = async () => {
		setUpLoading(true)
		const ok: any = await dispatch(setCommentRating(comment.id, comment.post_id, 1))
		if (upRef.current)
			upRef.current.blur()
		setUpLoading(false)
		if (!ok)
			message.error('Can not rate comment!')
	}

	const onDownClick = async () => {
		setDownLoading(true)
		const ok: any = await dispatch(setCommentRating(comment.id, comment.post_id, -1))
		if (downRef.current)
			downRef.current.blur()
		setDownLoading(false)
		if (!ok)
			message.error('Can not rate comment!')
	}

	const upBtn = <Button className={`${s.commentUp} ${isRatedUp && s.commentRatedUp}`} icon={<UpOutlined/>} ref={upRef}
						  disabled={!isAuth} onClick={onUpClick} loading={upLoading} type='text' size='small'/>,
		downBtn = <Button className={`${s.downComment} ${isRatedDown && s.commentRatedDown}`} icon={<DownOutlined/>}
						  disabled={!isAuth} onClick={onDownClick} loading={downLoading} type='text' size='small'
						  ref={downRef}/>

	const rating = <>
		<div className={s.commentRating}>
			{comment.commentRating}
		</div>
	</>

	const updatedAuthor = <>
		{author}
		{check && <>
			<Popover trigger='click' placement='top' visible={visible} onVisibleChange={handleVisibleChange}
					 content={(
						 <div className='actions'>
							 {editBtn}
							 {deleteBtn}
						 </div>
					 )}>
				<Button type='text' icon={<MoreOutlined/>} size='small'/>
			</Popover>
		</>}
	</>

	return <AntComment author={updatedAuthor} content={cContent} datetime={datetime} actions={[rating, upBtn, downBtn]}
					   key={comment.id}/>
}
