import React from 'react'
import './App.css'
import {Route, Router, Switch} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {initializedSelector, isAuthSelector} from './redux/selectors'
import {initializeApp} from './redux/app-reducer'
import store from './redux/store'
import Auth from './components/Auth/Auth'
import history from './history'
import Header from './components/Header/Header'
import CreatePost from './components/CreatePost/CreatePost'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import LeftMenu from './components/LeftMenu/LeftMenu'
import Actions from './components/Actions/Actions'
import Error404 from './components/common/errors/Error404'
import {toast} from 'react-toastify'
import AppPreloader from './components/common/preloaders/AppPreloader'
import Posts from './components/Posts/Posts'
import PostPage from './components/Posts/PostPage'
import User from './components/User/User'

toast.configure()

// TODO:
// check all the features and functions
// create new errors to authorization and edit post from address
// make all requests for several items paginated: take only some portion of it, and just scroll to request more

const App = ({initialized, isAuth, initializeApp}) => {
	React.useEffect(() => {
		initializeApp()
	}, [initializeApp])

	if (!initialized) {
		return <AppPreloader/>
	}

	const paths = ['/create', '/edit']

	return (
		<div className='App'>
			<Header/>
			<Row className='main'>
				<Col span={3} offset={3}>
					<LeftMenu/>
				</Col>
				<Col span={10} offset={1}>
					<Switch>
						<Route exact path='/auth/signup'>
							<Auth register/>
						</Route>
						<Route exact path='/auth/signin'>
							<Auth/>
						</Route>
						<Route exact path={paths}>
							<CreatePost/>
						</Route>
						<Route exact path='/post/:id'>
							<PostPage/>
						</Route>
						<Route exact path='/user/:id'>
							<User/>
						</Route>
						<Route exact path='/my'>
							<Posts type='my'/>
						</Route>
						<Route exact path='/up-voted'>
							<Posts type='upvoted'/>
						</Route>
						<Route exact path='/down-voted'>
							<Posts type='downvoted'/>
						</Route>
						<Route exact path='/by-categories'>
							<Posts type='categories'/>
						</Route>
						<Route exact path='/'>
							<Posts/>
						</Route>
						<Route>
							<Error404/>
						</Route>
					</Switch>
				</Col>
				<Col span={3} offset={1}>
					<Actions/>
				</Col>
			</Row>
		</div>
	)
}

const mapStateToProps = state => ({
	initialized: initializedSelector(state),
	isAuth: isAuthSelector(state)
})

const mapDispatchToProps = {
	initializeApp
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

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
