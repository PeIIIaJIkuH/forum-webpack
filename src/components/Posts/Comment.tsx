import React, {ChangeEvent, FC, ReactNode} from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {DeleteOutlined, EditOutlined, MoreOutlined, SaveOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import {DeleteComment, deleteComment, EditComment, editComment} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import Popover from 'antd/lib/popover'
import {State} from '../../redux/store'
import {TComment} from '../../types/types'
import message from 'antd/lib/message'

type OwnProps = {
	author: ReactNode
	content: string
	datetime: ReactNode
	comment: TComment
	check: boolean
	userPage?: boolean
}

type Props = MapStateToProps & MapDispatchToProps & OwnProps

const Comment: FC<Props> = ({author, content, datetime, comment, check, deleteComment, editComment, userPage}) => {
	const [isEdit, setIsEdit] = React.useState(false),
		[text, setText] = React.useState(content),
		[deleteLoading, setDeleteLoading] = React.useState(false),
		[editLoading, setEditLoading] = React.useState(false),
		[visible, setVisible] = React.useState(false)

	const paragraphs = content.split('\n').map((paragraph, i) => (<p key={i}>{paragraph}</p>)),
		autoSize = {minRows: 1, maxRows: 5}

	const onDelete = async () => {
		let ok: any
		setDeleteLoading(true)
		if (!userPage) {
			ok = await deleteComment(comment.id)
		} else {
			ok = await deleteComment(comment.id, comment.post_id)
		}
		setDeleteLoading(false)
		if (!ok) {
			message.error('Can not delete comment!')
		}
	}

	const onEdit = async () => {
		let ok: any = true
		if (!isEdit) {
			setIsEdit(true)
		} else {
			setEditLoading(true)
			if (!userPage) {
				ok = await editComment(comment.id, comment.author.id, comment.post_id, text, false)
			} else {
				ok = await editComment(comment.id, comment.author.id, comment.post_id, text, true)
			}
			setEditLoading(false)
			setIsEdit(false)
		}
		if (!ok) {
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
							loading={deleteLoading}/>,
		cContent = !isEdit ? paragraphs :
			<TextArea autoSize={autoSize} defaultValue={content} onChange={onChange} allowClear autoFocus/>

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible)
	}

	return <AntComment author={(
		<>
			{author}
			{check && (
				<Popover trigger='click' placement='top' visible={visible} onVisibleChange={handleVisibleChange}
						 content={(
							 <div className='actions'>
								 {editBtn}
								 {deleteBtn}
							 </div>
						 )}>
					<Button type='text' icon={<MoreOutlined/>} size='small'/>
				</Popover>
			)}
		</>
	)} content={cContent} datetime={datetime}/>
}

type MapStateToProps = {}
const mapStateToProps = (state: State): MapStateToProps => ({})

type MapDispatchToProps = {
	deleteComment: DeleteComment
	editComment: EditComment
}
const mapDispatchToProps = {
	deleteComment,
	editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)