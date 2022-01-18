import React, {ChangeEvent, FC, ReactNode, useRef, useState} from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, SaveOutlined, UpOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import Popover from 'antd/lib/popover'
import {IComment} from '../../types'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import commentsState from '../../store/commentsState'
import authState from '../../store/authState'

type Props = {
	author: ReactNode
	content: string
	datetime: ReactNode
	comment: IComment
	check: boolean
	userPage?: boolean
}

export const Comment: FC<Props> = observer(({
	                                            author, content,
	                                            datetime, comment,
	                                            check, userPage,
                                            }) => {
	const [isEdit, setIsEdit] = useState(false),
		[text, setText] = useState(content),
		[deleteLoading, setDeleteLoading] = useState(false),
		[editLoading, setEditLoading] = useState(false),
		[visible, setVisible] = useState(false)

	const paragraphs = content.split('\n').map((paragraph: string, i: number) => (<p key={i}>{paragraph}</p>))

	const onDelete = async () => {
		let status: boolean
		await setDeleteLoading(true)
		if (!userPage) {
			status = await commentsState.deleteComment(comment.id)
		} else {
			status = await commentsState.deleteComment(comment.id, comment.post_id)
		}
		await setDeleteLoading(false)
		await setVisible(false)

		if (!status) {
			message.error('Can not delete comment!')
		}
	}

	const onEdit = async () => {
		let status = true
		if (!isEdit) {
			await setIsEdit(true)
		} else {
			await setEditLoading(true)
			status = await commentsState.editComment(comment, text)
			await setEditLoading(false)
			await setIsEdit(false)
		}
		if (!status) {
			message.error('Can not edit comment!')
		}
	}

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.currentTarget.value)
	}

	const edit = <EditOutlined className={s.icon}/>,
		save = <SaveOutlined className={s.icon}/>

	const editBtn = <Button type='text' icon={!isEdit ? edit : save} onClick={onEdit} loading={editLoading}/>,
		deleteBtn = <Button danger type='text' icon={<DeleteOutlined className={s.icon}/>} onClick={onDelete}
		                    loading={deleteLoading}
		/>,
		cContent = !isEdit ? paragraphs :
			<TextArea autoSize={{minRows: 1, maxRows: 5}} defaultValue={content} onChange={onChange} allowClear
			          autoFocus
			/>

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
		const status = await commentsState.setCommentRating(comment, 1)
		if (upRef.current) {
			upRef.current.blur()
		}
		setUpLoading(false)
		if (!status) {
			message.error('Can not rate comment!')
		}
	}

	const onDownClick = async () => {
		setDownLoading(true)
		const status = await commentsState.setCommentRating(comment, -1)
		if (downRef.current) {
			downRef.current.blur()
		}
		setDownLoading(false)
		if (!status) {
			message.error('Can not rate comment!')
		}
	}

	const upBtn = <Button className={`${s.commentUp} ${isRatedUp && s.commentRatedUp}`} icon={<UpOutlined/>} ref={upRef}
	                      disabled={!authState.user?.id} onClick={onUpClick} loading={upLoading} type='text' size='small'
		/>,
		downBtn = <Button className={`${s.downComment} ${isRatedDown && s.commentRatedDown}`} icon={<DownOutlined/>}
		                  disabled={!authState.user?.id} onClick={onDownClick} loading={downLoading} type='text' size='small'
		                  ref={downRef}
		/>

	const rating = (
		<div className={s.commentRating}>
			{comment.commentRating}
		</div>
	)

	const updatedAuthor = <>
		{author}
		{check && (
			<Popover trigger='click' placement='top' visible={visible} onVisibleChange={handleVisibleChange}
			         content={(
				         <div className='actions'>
					         {editBtn}
					         {deleteBtn}
				         </div>
			         )}
			>
				<Button type='text' icon={<MoreOutlined/>} size='small'/>
			</Popover>
		)}
	</>

	return (
		<AntComment author={updatedAuthor} content={cContent} datetime={datetime} actions={[rating, upBtn, downBtn]}
		            key={comment.id}
		/>
	)
})
