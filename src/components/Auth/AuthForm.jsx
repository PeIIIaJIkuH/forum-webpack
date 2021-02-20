import React from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import {InfoCircleOutlined, LockOutlined, UserOutlined} from '@ant-design/icons'
import {defaultValidator} from '../../utils/helpers/helpers'
import Tooltip from 'antd/lib/tooltip'

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

const AuthForm = ({onsubmit, isSignup, form, isFetching}) => {
	const usernameInfo = (
			<Tooltip title={<>
				<div>4-20 characters long.</div>
				<div>Allowed: a-z, A-Z, 0-9, _, .</div>
				<div>No _, . at the beginning or end.</div>
				<div>No __, _., ._, .. inside.</div>
			</>}>
				<InfoCircleOutlined className='inputInfo'/>
			</Tooltip>
		),
		emailInfo = (
			<Tooltip title={<>
				<div>Just valid E-mail.</div>
			</>}>
				<InfoCircleOutlined className='inputInfo'/>
			</Tooltip>
		),
		passwordInfo = (
			<Tooltip title={<>
				<div>6-20 characters long.</div>
				<div>Allowed: a-z, A-Z, 0-9, _, .</div>
				<div>At least one lowercase.</div>
				<div>At least one uppercase.</div>
				<div>At least one digit.</div>
			</>}>
				<InfoCircleOutlined className='inputInfo'/>
			</Tooltip>
		)

	return (
		<Form name='auth' onFinish={onsubmit} form={form}>
			<Form.Item name='username' rules={[defaultValidator('Username')]} label={usernameInfo} colon={false}>
				<Input prefix={<UserOutlined/>} placeholder='Username' autoFocus/>
			</Form.Item>
			{isSignup &&
			<Form.Item name='email' label={emailInfo} colon={false} rules={[defaultValidator('E-mail'), {
				type: 'email',
				message: 'The input is not valid E-mail!'
			}]}>
				<Input prefix='@' placeholder='E-mail'/>
			</Form.Item>
			}
			<Form.Item name='password' rules={[defaultValidator('Password')]} label={passwordInfo} colon={false}>
				<Input.Password prefix={<LockOutlined/>} placeholder='Password'/>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit' loading={!!isFetching}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AuthForm