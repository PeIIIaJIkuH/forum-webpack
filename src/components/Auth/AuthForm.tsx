import React, {FC} from 'react'
import Button from 'antd/lib/button'
import Form, {FormInstance} from 'antd/lib/form'
import Input from 'antd/lib/input'
import {InfoCircleOutlined, LockOutlined, UserOutlined} from '@ant-design/icons'
import {defaultValidator} from '../../utils/helpers/helpers'
import Tooltip from 'antd/lib/tooltip'

const tailLayout = {
	wrapperCol: {offset: 8, span: 16}
}

type Props = {
	onsubmit: (obj: { username: string, email: string, password: string }) => Promise<void>
	register?: boolean
	form: FormInstance
	isFetching: boolean
}

export const AuthForm: FC<Props> = ({onsubmit, register, form, isFetching}) => {
	const usernameInfo = <>
			<Tooltip title={<>
				<div>4-20 characters long.</div>
				<div>Allowed: a-z, A-Z, 0-9, _, .</div>
				<div>No _, . at the beginning or end.</div>
				<div>No __, _., ._, .. inside.</div>
			</>}>
				<InfoCircleOutlined className='inputInfo'/>
			</Tooltip>
		</>,
		emailInfo = <>
			<Tooltip title={<>
				<div>Just valid E-mail.</div>
			</>}>
				<InfoCircleOutlined className='inputInfo'/>
			</Tooltip>
		</>,
		passwordInfo = <>
			<Tooltip title={<>
				<div>6-20 characters long.</div>
				<div>Allowed: a-z, A-Z, 0-9, _, .</div>
				<div>At least one lowercase.</div>
				<div>At least one uppercase.</div>
				<div>At least one digit.</div>
			</>}>
				<InfoCircleOutlined className='inputInfo'/>
			</Tooltip>
		</>

	return <>
		<Form name='auth' onFinish={onsubmit} form={form}>
			<Form.Item name='username' rules={[defaultValidator('Username', register)]} colon={false}
					   label={register && usernameInfo}>
				<Input prefix={<UserOutlined/>} placeholder='Username' autoFocus/>
			</Form.Item>
			{register && <>
				<Form.Item name='email' label={emailInfo} colon={false} rules={[defaultValidator('E-mail', true), {
					type: 'email',
					message: 'The input is not valid E-mail!'
				}]}>
					<Input prefix='@' placeholder='E-mail'/>
				</Form.Item>
			</>}
			<Form.Item name='password' rules={[defaultValidator('Password', register)]} colon={false}
					   label={register && passwordInfo}>
				<Input.Password prefix={<LockOutlined/>} placeholder='Password'/>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit' loading={isFetching}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	</>
}