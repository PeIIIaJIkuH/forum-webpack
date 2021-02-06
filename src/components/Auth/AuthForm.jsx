import React from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

const AuthForm = ({onsubmit, isSignup}) => (
	<Form name='auth' onFinish={onsubmit}>
		<Form.Item name={(isSignup ? 'signUp' : 'signIn') + 'Username'} rules={[{
			required: true,
			message: 'Please enter your username!'
		}]}>
			<Input prefix={<UserOutlined/>} placeholder='Username' autoFocus/>
		</Form.Item>
		{isSignup &&
		<Form.Item name='signUpEmail' rules={[{
			required: true,
			type: 'email',
			message: 'The input is not valid E-mail!'
		}]}>
			<Input prefix='@' placeholder='E-mail'/>
		</Form.Item>
		}
		<Form.Item name={(isSignup ? 'signUp' : 'signIn') + 'Password'} rules={[{
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