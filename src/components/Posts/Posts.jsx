import React from 'react'
import Post from './Post'
import {Card, Empty} from 'antd'

const Posts = ({posts, setRating, isAuth, isUserPage}) => {
	return (
		<section className='posts'>
			{posts ?
				posts.map((post, i) => (
					<Post data={post} key={i} setRating={setRating} isAuth={isAuth} isUserPage={isUserPage}/>
				)) :
				<Card><Empty/></Card>
			}
		</section>
	)
}

export default Posts