import React from 'react'
import {getIsAuthSelector, getUserSelector} from '../../redux/selectors'
import {requestUser, setRating} from '../../redux/posts-reducer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import UserInfo from './UserInfo'
import UserPosts from '../Posts/UserPosts'

class User extends React.Component {
	async componentDidMount() {
		const id = this.props.match.params.id
		await this.props.requestUser(id)
	}

	render() {
		return (
			<>
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