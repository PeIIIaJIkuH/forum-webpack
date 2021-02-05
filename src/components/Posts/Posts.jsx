import React from 'react'
import Post from './Post'

const Posts = ({posts, setRating, isAuth}) => {
	return (
		<section className='posts'>
			{posts && posts.map((post, i) => (
				<Post data={post} key={i} setRating={setRating} isAuth={isAuth}/>
			))}
		</section>
	)
}

export default Posts