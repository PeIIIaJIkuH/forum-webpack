import React from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {DeleteOutlined, EditOutlined, MoreOutlined, SaveOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import {deleteComment, editComment} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {notificationType, openNotification} from '../../utils/helpers/helpers'
import Popover from 'antd/lib/popover'

const Comment = ({author, content, datetime, comment, check, deleteComment, editComment, userPage}) => {
	const [isEdit, setIsEdit] = React.useState(false),
		[text, setText] = React.useState(content),
		[deleteLoading, setDeleteLoading] = React.useState(false),
		[editLoading, setEditLoading] = React.useState(false),
		[visible, setVisible] = React.useState(false)

	const paragraphs = content.split('\n').map((paragraph, i) => (<p key={i}>{paragraph}</p>)),
		autoSize = {minRows: 1, maxRows: 5}

	const onDelete = async () => {
		let ok
		setDeleteLoading(true)
		if (!userPage) {
			ok = await deleteComment(comment.id)
		} else {
			ok = await deleteComment(comment.id, comment.post_id)
		}
		setDeleteLoading(false)
		if (!ok) {
			openNotification(notificationType.ERROR, 'Can not delete comment!')
		}
	}

	const onEdit = async () => {
		let ok = true
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
			openNotification(notificationType.ERROR, 'Can not edit comment!')
		}
	}

	const onChange = e => {
		setText(e.target.value)
	}

	const edit = <EditOutlined className={s.icon}/>,
		save = <SaveOutlined className={s.icon}/>

	const editBtn = <Button type='text' icon={!isEdit ? edit : save} onClick={onEdit} loading={editLoading}/>,
		deleteBtn = <Button danger type='text' icon={<DeleteOutlined className={s.icon}/>} onClick={onDelete}
							loading={deleteLoading}/>,
		cContent = !isEdit ? paragraphs :
			<TextArea autoSize={autoSize} defaultValue={content} onChange={onChange} allowClear autoFocus/>

	const handleVisibleChange = visible => {
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

const mapStateToProps = state => ({})

const mapDispatchToProps = {
	deleteComment,
	editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)