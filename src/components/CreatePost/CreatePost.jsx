import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getIsAuthSelector} from '../../redux/auth-selectors'
import CreatePostForm from './CreatePostForm'
import {postAPI} from '../../api/requests'

const CreatePost = ({isAuth}) => {
	const onSubmit = async ({title, content}) => {
		const data = postAPI.create(title, content, ['test'])
		console.log(data)
	}

	if (!isAuth) return <Redirect to='/'/>

	return (
		<section className='createPost'>
			<div className='container'>
				<div className='inner'>
					<h1>Create Post</h1>
					<CreatePostForm onsubmit={onSubmit}/>
				</div>
			</div>
		</section>
	)
}

const mapStateToProps = state => (
	{
		isAuth: getIsAuthSelector(state)
	}
)

const mapDispatchToProps =
	{}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)