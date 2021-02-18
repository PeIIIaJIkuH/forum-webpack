import React from 'react'
import s from './RightMenu.module.css'
import {connect} from 'react-redux'
import {menuOpenSelector} from '../../redux/selectors'
import LeftMenu from '../LeftMenu/LeftMenu'
import Layout from 'antd/lib/layout'

const RightMenu = ({menuOpen}) => {
	return (
		<div className={`${s.wrapper} ${menuOpen ? s.open : ''}`}>
			<LeftMenu mobile/>
			<Layout.Footer className={s.footer}>
				<div>by PeIIIaJIkuH and indecember</div>
				<div>GO, React, SQLite3</div>
				<div>February, 2021</div>
			</Layout.Footer>
		</div>
	)
}

const mapStateToProps = state => ({
	menuOpen: menuOpenSelector(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)