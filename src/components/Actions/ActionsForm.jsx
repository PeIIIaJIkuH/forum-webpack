import React from 'react'
import s from './Actions.module.css'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Select from 'antd/lib/select'

const layout = {
	wrapperCol: {
		span: 24
	}
}

const tailLayout = {
	wrapperCol: {
		span: 24
	}
}

class ActionsForm extends React.Component {
	async componentDidMount() {
		this.props.requestCategories()
	}

	render() {
		return (
			<Form {...layout} name='selectPosts' onFinish={this.props.onSubmit} layout='horizontal'>
				<Form.Item name='categories'>
					<Select mode='multiple' size='default' placeholder='Please select categories' allowClear>
						{this.props.categories && this.props.categories.map(e => (
							<Select.Option key={e}>{e}</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item {...tailLayout} className={s.btnWrapper}>
					<Button type='primary' htmlType='submit'>
						Search Posts
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default ActionsForm