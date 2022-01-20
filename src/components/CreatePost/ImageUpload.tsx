import React, {FC, useState} from 'react'
import {InboxOutlined} from '@ant-design/icons'
import Upload, {RcFile} from 'antd/lib/upload'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'
import postsState from '../../store/postsState'
import {postsAPI} from '../../api/posts'

type Props = {
	setIsImage: (isImage: boolean) => void
	setImagePath: (path: string) => void
	defaultFileList: any
}

export const ImageUpload: FC<Props> = observer(({setIsImage, setImagePath, defaultFileList}) => {
	const [fileList] = useState([])[0],
		setProgress = useState(0)[1]

	const beforeUpload = (file: RcFile) => {
		const isCorrectType = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif'
		if (!isCorrectType) {
			message.error(`${file.name} is not an image of required type!`).then()
		}
		const isLt20M = file.size / 1024 / 1024 < 20
		if (!isLt20M) {
			message.error('Image must smaller than 20MB!').then()
		}
		return isCorrectType && isLt20M
	}

	const progressData = {
		strokeColor: {
			'0%': '#108ee9',
			'100%': '#87d068',
		},
		strokeWidth: 3,
		format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
	}

	const customRequest = async ({file, onProgress, onSuccess, onError}: any) => {
		const formData = new FormData()
		const config = {
			headers: {'content-type': 'multipart/form-data'},
			onUploadProgress: (event: any) => {
				const percent = parseFloat(Math.floor((event.loaded / event.total) * 100).toFixed(2))
				setProgress(percent)
				if (percent === 100) {
					setTimeout(() => setProgress(0), 1000)
				}
				onProgress({percent: (event.loaded / event.total) * 100})
			},
		}
		formData.append('image', file)
		try {
			const {data, status} = await postsAPI.uploadImage(formData, config)
			if (status) {
				setIsImage(true)
				setImagePath(data)
				onSuccess()
			}
		} catch (err) {
			onError(err)
		}
	}

	const onRemove = async () => {
		const {status} = await postsAPI.deleteImage(postsState.editing?.id!)
		if (status) {
			setIsImage(false)
			setImagePath('')
		}
	}

	return (
		<Upload.Dragger name='image' fileList={fileList} beforeUpload={beforeUpload} progress={progressData}
		                customRequest={customRequest} listType='picture' maxCount={1} onRemove={onRemove}
		                defaultFileList={defaultFileList}
		>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined/>
			</p>
			<p className='ant-upload-text'>Click or drag file to this area to upload</p>
		</Upload.Dragger>
	)
})
