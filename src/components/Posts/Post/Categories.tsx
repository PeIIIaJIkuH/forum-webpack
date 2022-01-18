import React, {FC} from 'react'
import s from '../Posts.module.css'
import Tag from 'antd/lib/tag'
import {ICategory} from '../../../types'
import {useHistory} from 'react-router-dom'
import {categoriesQuery} from '../../../utils/helpers'

type Props = {
	categories: ICategory[]
}

export const Categories: FC<Props> = ({categories}) => {
	const history = useHistory()

	const onClick = (categories: string) => {
		const query = categoriesQuery(categories)
		history.push(`/by-categories?${query}`)
	}

	return categories && (
		<div className={s.categories}>
			{categories.map(category => (
				<Tag className={s.tag} key={category.id} onClick={() => onClick(category.name)}>
					{category.name}
				</Tag>
			))}
		</div>
	)
}
