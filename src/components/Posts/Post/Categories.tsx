import React, {FC} from 'react'
import s from '../Posts.module.css'
import Tag from 'antd/lib/tag'
import {Category} from '../../../types/types'
import {RequestPostsByCategories} from '../../../redux/posts-reducer'
import {SetSelectedCategories} from '../../../redux/categories-reducer'

type Props = {
	categories: Category[]
	requestPostsByCategories: RequestPostsByCategories
	setSelectedCategories: SetSelectedCategories
}

const Categories: FC<Props> = ({categories, requestPostsByCategories, setSelectedCategories}) => {
	return categories && <>
		<div className={s.categories}>
			{categories.map(category => (
				<Tag className={s.tag} key={category.id} onClick={() => {
					setSelectedCategories([category.name])
					requestPostsByCategories([category.name])
				}}>
					{category.name}
				</Tag>
			))}
		</div>
	</>
}
export default Categories