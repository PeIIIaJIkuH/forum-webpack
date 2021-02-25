import React, {ChangeEvent, FC, ReactNode} from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, SaveOutlined, UpOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import {
	DeleteComment,
	deleteComment,
	EditComment,
	editComment,
	setCommentRating,
	SetCommentRating
} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import Popover from 'antd/lib/popover'
import {State} from '../../redux/store'
import {TComment} from '../../types/types'
import message from 'antd/lib/message'
import {isAuthSelector} from '../../redux/selectors'

type OwnProps = {
	author: ReactNode
	content: string
	datetime: ReactNode
	comment: TComment
	check: boolean
	userPage?: boolean
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps

const Comment: FC<Props> = ({
								author, content,
								datetime, comment,
								check, deleteComment, editComment, userPage, isAuth,
								setCommentRating
							}) => {
	const [isEdit, setIsEdit] = React.useState(false),
		[text, setText] = React.useState(content),
		[deleteLoading, setDeleteLoading] = React.useState(false),
		[editLoading, setEditLoading] = React.useState(false),
		[visible, setVisible] = React.useState(false)

	const paragraphs = content.split('\n').map((paragraph, i) => (<p key={i}>{paragraph}</p>))

	const onDelete = async () => {
		let ok: any
		await setDeleteLoading(true)
		if (!userPage)
			ok = await deleteComment(comment.id)
		else
			ok = await deleteComment(comment.id, comment.post_id)
		await setDeleteLoading(false)
		await setVisible(false)
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
		[upLoading, setUpLoading] = React.useState(false),
		[downLoading, setDownLoading] = React.useState(false),
		upRef = React.useRef(null),
		downRef = React.useRef(null)

	const onUpClick = async () => {
		setUpLoading(true)
		const ok: any = await setCommentRating(comment.id, comment.post_id, 1)
		// @ts-ignore
		upRef.current.blur()
		setUpLoading(false)
		if (!ok)
			message.error('Can not rate comment!')
	}

	const onDownClick = async () => {
		setDownLoading(true)
		const ok: any = await setCommentRating(comment.id, comment.post_id, -1)
		// @ts-ignore
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

type MapStateToProps = {
	isAuth: boolean
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state)
})

type MapDispatchToProps = {
	deleteComment: DeleteComment
	editComment: EditComment
	setCommentRating: SetCommentRating
}
const mapDispatchToProps = {
	deleteComment,
	editComment,
	setCommentRating
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)