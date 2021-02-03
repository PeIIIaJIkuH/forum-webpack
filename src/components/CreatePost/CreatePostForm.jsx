import React from 'react'
import {Field, Form} from 'react-final-form'
import {Input, TextArea} from '../common/FormControls/FormControls'
import {required} from '../../utils/validators/validators'

const CreatePostForm = ({onsubmit}) => (
	<Form onSubmit={onsubmit}>
		{({handleSubmit, error}) => (
			<form className='form' onSubmit={handleSubmit}>
				<div className='formGroup'>
					<label htmlFor='title'>Title</label>
					<Field name="title" component={Input} type='text'
						   validate={required}/>
				</div>
				<div className='formGroup'>
					<label htmlFor='content'>Content</label>
					<Field name="content" component={TextArea} type='text' validate={required}/>
				</div>
				<button type='submit' className='button'>Create post</button>
			</form>
		)}
	</Form>
)

export default CreatePostForm