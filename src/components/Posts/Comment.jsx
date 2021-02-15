import React from 'react'
import AntComment from 'antd/lib/comment'
import Button from 'antd/lib/button'
import {EditOutlined, SaveOutlined} from '@ant-design/icons'
import s from './Posts.module.css'
import TextArea from 'antd/lib/input/TextArea'
import {editComment} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import {toastOptions} from '../../utils/helpers/helpers'

const Comment = ({author, content, datetime, actions, comment, check, editComment, userPage}) => {
	const [isEdit, setIsEdit] = React.useState(false),
		[text, setText] = React.useState(content)

	const paragraphs = content.split('\n').map((paragraph, i) => (<p key={i}>{paragraph}</p>)),
		autoSize = {minRows: 1, maxRows: 5}

	const onEdit = async () => {
		let ok = true
		if (!isEdit) {
			setIsEdit(true)
		} else {
			if (!userPage) {
				ok = await editComment(comment.id, comment.author.id, comment.post_id, text, false)
			} else {
				ok = await editComment(comment.id, comment.author.id, comment.post_id, text, true)
			}
			setIsEdit(false)
		}
		if (!ok) {
			toast.warning('Could not edit comment.', toastOptions)
		}
	}

	const onChange = e => {
		setText(e.target.value)
	}

	const edit = <EditOutlined className={s.icon}/>,
		save = <SaveOutlined className={s.icon}/>

	const editBtn = <Button type='text' icon={!isEdit ? edit : save} onClick={onEdit}/>,
		cContent = !isEdit ? paragraphs :
			<TextArea autoSize={autoSize} defaultValue={content} onChange={onChange} allowClear autoFocus/>

	const cActions = check && [...actions, editBtn]

	return <AntComment author={author} content={cContent} datetime={datetime} actions={cActions}/>
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
	editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)