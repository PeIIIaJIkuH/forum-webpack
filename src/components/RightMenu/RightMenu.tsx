import React, {FC} from 'react'
import s from './RightMenu.module.css'
import {useSelector} from 'react-redux'
import {menuOpenSelector} from '../../redux/selectors'
import {LeftMenu} from '../LeftMenu/LeftMenu'
import Layout from 'antd/lib/layout'

export const RightMenu: FC = () => {
	const menuOpen = useSelector(menuOpenSelector)

	return <>
		<div className={`${s.wrapper} ${menuOpen ? s.open : ''}`}>
			<LeftMenu mobile/>
			<Layout.Footer className={s.footer}>
				<div>by PeIIIaJIkuH and indecember</div>
				<div>GO, React, SQLite3</div>
				<div>February, 2021</div>
			</Layout.Footer>
		</div>
	</>
}