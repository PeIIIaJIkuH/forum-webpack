import React, {FC} from 'react'
import s from '../Posts.module.css'

type Props = {
	content: string
}

const Content: FC<Props> = ({content}) => {
	return (
		<div className={s.content}>
			{content.split('\n').map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
		</div>
	)
}

export default Content