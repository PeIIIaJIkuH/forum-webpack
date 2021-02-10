import React from 'react'
import s from '../Posts.module.css'

const Content = ({content}) => {
	return (
		<div className={s.content}>
			{content.split('\n').map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
		</div>
	)
}

export default Content