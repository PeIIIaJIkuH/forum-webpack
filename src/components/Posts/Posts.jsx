import React from 'react'
import Post from './Post'
import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'

const Posts = ({posts, setRating, isAuth, isUserPage, requestPostsByCategories}) => {
	return (
		<section className='posts'>
			{posts ?
				posts.map((post, i) => (
					<Post data={post} key={i} setRating={setRating} isAuth={isAuth} isUserPage={isUserPage}
						  requestPostsByCategories={requestPostsByCategories}/>
				)) :
				<Card>
					<Empty/>
				</Card>
			}
		</section>
	)
}

export default Posts