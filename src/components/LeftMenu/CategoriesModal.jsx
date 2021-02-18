import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import CategoriesSearch from '../Actions/CategoriesSearch'

const CategoriesModal = ({modalVisible, setModalVisible}) => {
	const close = () => {
		setModalVisible(false)
	}

	return (
		<Modal title='Search by Categories' visible={modalVisible} footer={null} onCancel={close}>
			<CategoriesSearch closeModal={close}/>
		</Modal>
	)
}

export default CategoriesModal