import React from 'react'
import {Button, Form, Input} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

const AuthForm = ({onsubmit, isSignup}) => (
	<Form name='auth' onFinish={onsubmit}>
		<Form.Item name='username' rules={[{
			required: true,
			message: 'Please enter your username!'
		}]}>
			<Input prefix={<UserOutlined/>} placeholder='Username'/>
		</Form.Item>
		{isSignup &&
		<Form.Item name='email' rules={[{
			required: true,
			type: 'email',
			message: 'The input is not valid E-mail!'
		}]}>
			<Input prefix='@' placeholder='E-mail'/>
		</Form.Item>
		}
		<Form.Item name='password' rules={[{
			required: true,
			message: 'Please input your password!'
		}]}>
			<Input.Password prefix={<LockOutlined/>} placeholder='Password'/>
		</Form.Item>
		<Form.Item {...tailLayout}>
			<Button type='primary' htmlType='submit'>
				Submit
			</Button>
		</Form.Item>
	</Form>
)

export default AuthForm