import React, {FC} from 'react'
import s from './RightMenu.module.css'
import {connect} from 'react-redux'
import {menuOpenSelector} from '../../redux/selectors'
import LeftMenu from '../LeftMenu/LeftMenu'
import Layout from 'antd/lib/layout'
import {State} from '../../redux/store'

type Props = MapStateToProps & MapDispatchToProps

const RightMenu: FC<Props> = ({menuOpen}) => {
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

type MapStateToProps = {
	menuOpen: boolean
}
const mapStateToProps = (state: State): MapStateToProps => ({
	menuOpen: menuOpenSelector(state)
})

type MapDispatchToProps = {}
const mapDispatchToProps: MapDispatchToProps = {}

export default connect<MapStateToProps, MapDispatchToProps, unknown, State>(mapStateToProps, mapDispatchToProps)(RightMenu)