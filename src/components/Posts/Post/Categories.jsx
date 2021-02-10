import React from 'react'
import s from '../Posts.module.css'
import Tag from 'antd/lib/tag'

const Categories = ({categories, requestPostsByCategories}) => {
	return (
		<>
			{categories &&
			<div className={s.categories}>
				{categories.map(category => (
					<Tag className={s.tag} key={category.id} onClick={() => {
						requestPostsByCategories([category.name])
					}}>
						{category.name}
					</Tag>
				))}
			</div>}
		</>
	)
}
export default Categories