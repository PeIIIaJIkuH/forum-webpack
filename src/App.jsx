import React from 'react'
import './App.css'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import Preloader from './components/common/Preloader/Preloader'
import {compose} from 'redux'
import {connect, Provider} from 'react-redux'
import {getInitializedSelector} from './redux/app-selectors'
import {initializeApp} from './redux/app-reducer'
import store from './redux/store'
import Auth from './components/Auth/Auth'

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if (!this.props.initialized)
			return <Preloader/>
		return (
			<div className='App'>
				<React.Suspense fallback={<Preloader/>}>
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

const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)

const MainApp = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		</BrowserRouter>
	)
}

export default MainApp
