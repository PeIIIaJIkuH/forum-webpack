import React, {FC} from 'react'
import Modal from 'antd/lib/modal/Modal'
import CategoriesSearch from '../Actions/CategoriesSearch'

type Props = {
	modalVisible: boolean
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoriesModal: FC<Props> = ({modalVisible, setModalVisible}) => {
	const close = () => {
		setModalVisible(false)
	}

	return <>
		<Modal title='Search by Categories' visible={modalVisible} footer={null} onCancel={close}>
			<CategoriesSearch closeModal={close} mobile/>
		</Modal>
	</>
}

export default CategoriesModal