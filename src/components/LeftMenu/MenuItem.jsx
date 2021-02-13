import React from 'react'
import Menu from 'antd/lib/menu'

const MenuItem = ({key, icon, forAll, isAuth, title, available, ...props}) => {
	const disabled = !(isAuth || forAll) || !available

	return (
		<Menu.Item key={key} icon={icon} disabled={disabled} {...props}>
			{title}
		</Menu.Item>
	)
}

export default MenuItem