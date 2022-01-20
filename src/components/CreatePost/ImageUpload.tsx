import React, {FC, useState} from 'react'
import {InboxOutlined} from '@ant-design/icons'
import Upload, {RcFile} from 'antd/lib/upload'
import message from 'antd/lib/message'
import {observer} from 'mobx-react-lite'

type Props = {
	defaultFileList: any
	setFormData: (formData: FormData | null) => void
	setImageState: (isImage: -1 | 0 | 1) => void
}

export const ImageUpload: FC<Props> = observer(({defaultFileList, setFormData, setImageState}) => {
	const [fileList] = useState([])[0]

	const beforeUpload = (file: RcFile) => {
		if (file.size / 1024 / 1024 >= 20) {
			message.error('Image must be less than 20 megabytes.').then()
			return false
		}
		return true
	}

	const customRequest = async ({file, onSuccess}: any) => {
		const formData = new FormData()
		formData.append('image', file)
		setFormData(formData)
		setImageState(1)
		onSuccess()
	}

	const onRemove = () => {
		setFormData(null)
		setImageState(-1)
	}

	return (
		<Upload.Dragger name='image' fileList={fileList} beforeUpload={beforeUpload} maxCount={1} listType='picture'
		                customRequest={customRequest} defaultFileList={defaultFileList} accept='.png,.jpg,.jpeg,.gif,.svg'
		                onRemove={onRemove}
		>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined/>
			</p>
			<p className='ant-upload-text'>Click or drag file to this area to upload</p>
		</Upload.Dragger>
	)
})
