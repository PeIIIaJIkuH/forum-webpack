import React, {FC, useEffect, useState} from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import s from './CreatePost.module.css'
import {CloudUploadOutlined, SaveOutlined, StopOutlined} from '@ant-design/icons'
import {useHistory, useLocation} from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea'
import {defaultValidator} from '../../utils/helpers'
import {ImageUpload} from './ImageUpload'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import {postsAPI} from '../../api/posts'

const layout = {
	labelCol: {span: 4},
	wrapperCol: {span: 20},
}

const tailLayout = {
	wrapperCol: {span: 24},
}

type Props = {
	isFetching: boolean
	setIsFetching: (fetching: boolean) => void
}

export const CreatePostForm: FC<Props> = observer(({isFetching, setIsFetching}) => {
	const location = useLocation(),
		history = useHistory(),
		[isImage, setIsImage] = useState(postsState.editing?.isImage || false),
		[imagePath, setImagePath] = useState(postsState.editing?.imagePath || '')

	useEffect(() => {
		postsState.fetchAllCategories().then()
		return () => {
			postsState.setEditing(null)
		}
	}, [location.pathname])

	type obj = { title: string, content: string, categories: string[] }
	const onSubmit = async ({title, content, categories}: obj) => {
		setIsFetching(true)
		title = title.trim()
		content = content?.replace(/\n+/, '\n').split('\n').map(line => line.trim()).join('\n')
		categories = categories.map(tag => tag.trim())
		if (!postsState.editing) {
			const {status} = await postsAPI.createPost(title, content, categories, isImage, imagePath)
			if (status) {
				await setIsFetching(false)
				history.push('/')
			} else
				message.error(`Can not ${!postsState.editing ? 'create' : 'edit'} post!`)
		} else {
			await postsAPI.editPost(postsState.editing.id, postsState.editing.author.id, title, content, categories, isImage, imagePath)
			await setIsFetching(false)
			history.push('/')
		}
	}

	const onCancel = () => {
		history.goBack()
	}

	const defaultFileList = [{
		uid: '1',
		name: postsState.editing?.imagePath.split('images/')[1],
		status: 'done',
		url: `https://${postsState.editing?.imagePath}`,
	}]

	return (
		<Form className={s.form} {...layout} name='createPost' onFinish={onSubmit}>
			<Form.Item label='Title' name='title' rules={[defaultValidator('Title')]} initialValue={postsState.editing?.title}>
				<Input autoFocus/>
			</Form.Item>
			<Form.Item label='Content' name='content' initialValue={postsState.editing?.content}
			           rules={!isImage ? [defaultValidator('Content')] : undefined}
			>
				<TextArea allowClear autoSize={{minRows: 3, maxRows: 10}} showCount/>
			</Form.Item>
			<Form.Item label='Image' name='image'>
				<ImageUpload setImagePath={setImagePath} setIsImage={setIsImage}
				             defaultFileList={postsState.editing?.isImage && defaultFileList}
				/>
			</Form.Item>
			<Form.Item label='Categories' name='categories' rules={[defaultValidator('Categories')]}
			           initialValue={postsState.editing?.categories.map(category => category.name)}
			>
				<Select mode='tags' allowClear>
					{postsState.allCategories?.map(category => (
						<Select.Option key={category.name} value={category.name}>
							{category.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item className={s.buttons} {...tailLayout}>
				<Button type='primary' danger onClick={onCancel} icon={<StopOutlined/>}>
					Cancel
				</Button>
				<Button className={s.create} type='primary' htmlType='submit'
				        icon={postsState.editing ? <SaveOutlined/> : <CloudUploadOutlined/>} loading={isFetching}
				>
					{postsState.editing ? 'Save' : 'Create'}
				</Button>
			</Form.Item>
		</Form>
	)
})
