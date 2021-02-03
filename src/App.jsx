import React from 'react'
import './App.css'
import {Route, Router, withRouter} from 'react-router-dom'
import Preloader from './components/common/Preloader/Preloader'
import {compose} from 'redux'
import {connect, Provider} from 'react-redux'
import {getInitializedSelector} from './redux/app-selectors'
import {initializeApp} from './redux/app-reducer'
import store from './redux/store'
import Auth from './components/Auth/Auth'
import {signout} from './redux/auth-reducer'
import history from './history'
import Header from './components/Header/Header'
import PostsContainer from './components/Posts/PostsContainer'
import CreatePost from './components/CreatePost/CreatePost'

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader/>
		}

		return (
			<div className='App'>
				<React.Suspense fallback={<Preloader/>}>
					<Route exact path='/' render={() => (
						<>
							<Header/>
							<PostsContainer/>
						</>
					)}/>
					<Route exact path='/create' render={() => <CreatePost/>}/>
					<Route exact path='/signup' render={() => <Auth isSignup={true}/>}/>
					<Route exact path='/signin' render={() => <Auth isSignup={false}/>}/>
				</React.Suspense>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	initialized: getInitializedSelector(state)
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
