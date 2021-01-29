import React from 'react'
import './App.css'
import {Link, Route, Router, withRouter} from 'react-router-dom'
import Preloader from './components/common/Preloader/Preloader'
import {compose} from 'redux'
import {connect, Provider} from 'react-redux'
import {getInitializedSelector} from './redux/app-selectors'
import {initializeApp} from './redux/app-reducer'
import store from './redux/store'
import Auth from './components/Auth/Auth'
import {signout} from './redux/auth-reducer'
import {getIsAuthSelector, getProfileSelector} from './redux/auth-selectors'
import history from './history'

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		const profile = getProfileSelector(store.getState())
		if (!this.props.initialized)
			return <Preloader/>
		return (
			<div className='App'>
				<React.Suspense fallback={<Preloader/>}>
					<Route exact path='/signup' render={() => <Auth isSignup={true}/>}/>
					<Route exact path='/signin' render={() => <Auth isSignup={false}/>}/>
					<div>
						<p>{profile.id}</p>
						<p>{profile.username}</p>
						<p>{profile.email}</p>
						<p>{profile.createdAt}</p>
						<p>{profile.lastActive}</p>
					</div>
					{!getIsAuthSelector(store.getState()) &&
					<React.Fragment>
						<Link to='/signup'>Sign Up</Link>
						<Link to='/signin'>Sign In</Link>
					</React.Fragment>
					}
					{getIsAuthSelector(store.getState()) &&
					<button onClick={this.props.signout}>Sign Out</button>
					}
				</React.Suspense>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	initialized: getInitializedSelector(state),
	profile: getProfileSelector(state)
})

const mapDispatchToProps = {
	initializeApp,
	signout
}

const AppContainer = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App)

const MainApp = () => {
	return (
		<Router history={history}>
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		</Router>
	)
}

export default MainApp
