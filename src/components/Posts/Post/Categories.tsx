import React, {FC} from 'react'
import s from '../Posts.module.css'
import Tag from 'antd/lib/tag'
import {Category} from '../../../types/types'
import {RequestPostsByCategories} from '../../../redux/posts-reducer'
import {SetSelectedCategories} from '../../../redux/categories-reducer'
import {useHistory} from 'react-router-dom'
import * as queryString from 'query-string'

type Props = {
	categories: Category[]
	requestPostsByCategories: RequestPostsByCategories
	setSelectedCategories: SetSelectedCategories
}

export const Categories: FC<Props> = ({categories, requestPostsByCategories, setSelectedCategories}) => {
	const history = useHistory()

	const onClick = (categories: string) => {
		const query = queryString.stringify({categories}, {
			arrayFormat: 'comma',
			skipEmptyString: true,
			skipNull: true
		})
		setSelectedCategories([categories])
		requestPostsByCategories([categories])
		history.push(`/by-categories?${query}`)
	}

	return categories && <>
		<div className={s.categories}>
			{categories.map(category => (
				<Tag className={s.tag} key={category.id} onClick={() => onClick(category.name)}>
					{category.name}
				</Tag>
			))}
		</div>
	</>
}