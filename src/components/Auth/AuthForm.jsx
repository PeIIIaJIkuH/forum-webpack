import React from 'react'
import s from './Auth.module.css'
import {Field, Form} from 'react-final-form'
import {Input} from '../common/FormControls/FormControls'
import {required} from '../../utils/validators/validators'

const AuthForm = ({onsubmit, isSignup}) => (
	<Form onSubmit={onsubmit}>
		{({handleSubmit, error}) => (
			<form className={s.form} onSubmit={handleSubmit}>
				<div className={s.formGroup}>
					<label htmlFor='username'>Username</label>
					<Field name='username' component={Input} type='text'
					       validate={required}/>
				</div>
				{isSignup &&
				<div className={s.formGroup}>
					<label htmlFor='email'>Email</label>
					<Field name='email' component={Input} type='email' validate={required}/>
				</div>
				}
				<div className={s.formGroup}>
					<label htmlFor='password'>Password</label>
					<Field name='password' component={Input} type='password' validate={required}/>
				</div>
				<button type='submit' className={s.button}>{isSignup ? 'Sign up' : 'Sign in'}</button>
			</form>
		)}
	</Form>
)

export default AuthForm