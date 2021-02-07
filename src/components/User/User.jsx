import React from 'react'
import {getIsAuthSelector, getUserSelector} from '../../redux/selectors'
import {requestUser, setRating} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserInfo from './UserInfo'
import UserPosts from '../Posts/UserPosts'
import {Helmet} from 'react-helmet'

class User extends React.Component {
	async componentDidMount() {
		const id = this.props.match.params.id
		await this.props.requestUser(id)
	}

	render() {
		return (
			<>
				<Helmet><title>{this.props.user ? this.props.user.username : 'User Page'} | forume</title></Helmet>
				<UserInfo user={this.props.user}/>
				<UserPosts/>
			</>

		)
	}

}

const mapStateToProps = state => ({
	user: getUserSelector(state),
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	requestUser,
	setRating
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User))