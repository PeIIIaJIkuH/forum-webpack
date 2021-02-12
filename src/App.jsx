import React from 'react'
import './App.css'
import {Route, Router, Switch} from 'react-router-dom'
import Preloader from './components/common/preloaders/Preloader'
import {connect, Provider} from 'react-redux'
import {getInitializedSelector, getIsAuthSelector} from './redux/selectors'
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
import {Error404} from './components/common/errors'
import {toast} from 'react-toastify'
import AppPreloader from './components/common/preloaders/AppPreloader'
import Posts from './components/Posts/Posts'
import PostPage from './components/Posts/PostPage'
import User from './components/User/User'

toast.configure()

// TODO:
// check all the features and functions
// finish edit post: update the form of createPost
// update authForm, from 5 variables to 3

const App = ({initialized, isAuth, initializeApp}) => {
	React.useEffect(() => {
		initializeApp()
	}, [initializeApp])

	const [progress, setProgress] = React.useState(0)

	if (!initialized) {
		return <AppPreloader/>
	}

	return (
		<div className='App'>
			<React.Suspense fallback={<Preloader/>}>
				<Header progress={progress} setProgress={setProgress}/>
				<Row className='main'>
					<Col span={3} offset={3}><LeftMenu/></Col>
					<Col span={10} offset={1}>
						<Switch>
							<Route exact path='/auth/signup' render={() => <Auth isSignup/>}/>
							<Route exact path='/auth/signin' render={() => <Auth/>}/>
							<Route exact path='/create' render={() => <CreatePost/>}/>
							<Route exact path='/post/:id' render={() => <PostPage/>}/>
							<Route exact path='/user/:id' render={() => <User/>}/>
							<Route exact path='/my' render={() => <Posts type='my'/>}/>
							<Route exact path='/up-voted' render={() => <Posts type='upvoted'/>}/>
							<Route exact path='/down-voted' render={() => <Posts type='downvoted'/>}/>
							<Route exact path='/by-categories' render={() => <Posts type='categories'/>}/>
							<Route exact path='/' render={() => <Posts/>}/>
							<Route render={() => <Error404/>}/>
						</Switch>
					</Col>
					<Col span={3} offset={1}><Actions isAuth={isAuth}/></Col>
				</Row>
			</React.Suspense>
		</div>
	)
}

const mapStateToProps = state => ({
	initialized: getInitializedSelector(state),
	isAuth: getIsAuthSelector(state)
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
