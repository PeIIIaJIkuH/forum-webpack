import React, {FC, ReactNode} from 'react'
import Menu from 'antd/lib/menu'
import s from '../User/User.module.css'

type Props = {
	key: string
	icon: ReactNode
	forAll?: boolean
	isAuth?: boolean
	title: string
	available?: boolean
	props?: any
}

const MenuItem: FC<Props> = ({key, icon, forAll, isAuth, title, available, ...props}) => {
	const disabled = !(isAuth || forAll) || !available

	return (
		<Menu.Item className={s.menuItem} key={key} icon={icon} disabled={disabled} {...props}>
			{title}
		</Menu.Item>
	)
}

export default MenuItem