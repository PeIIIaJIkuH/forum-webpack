import React, {FC} from 'react'
import s from './Preloader.module.css'

export const Preloader: FC = () => {
	return (
		<div className={s.preloader}>
			<div/>
			<div/>
		</div>
	)
}
