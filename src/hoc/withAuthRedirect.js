import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getIsAuthSelector} from '../redux/auth-selectors'

const mapStateToPropsForRedirect = state => ({
	isAuth: getIsAuthSelector(state)
})

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) return <Redirect to='/signin'/>
			return <Component {...this.props}/>
		}
	}

	return connect(mapStateToPropsForRedirect)(RedirectComponent)
}