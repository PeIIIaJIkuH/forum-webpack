import React from 'react'
import Menu from 'antd/lib/menu'

const MenuItem = ({key, icon, forAll, isAuth, title, available, ...props}) => {
	return (
		<Menu.Item key={key} icon={icon} disabled={!(isAuth || forAll && available)} {...props}>
			{title}
		</Menu.Item>
	)
}

export default MenuItem