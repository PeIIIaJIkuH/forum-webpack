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
// requestUserPosts gives commentsNumber = 0 for every post
// check all the features and functions
// finish edit and delete post

const App = ({initialized, isAuth, initializeApp}) => {
	React.useEffect(() => {
		initializeApp()
	}, [initializeApp])

	const [progress, setProgress] = React.useState(0),
		githubPath = '/forum-react'

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
							<Route exact path={`${githubPath}/auth/signup`} render={() => <Auth isSignup/>}/>
							<Route exact path={`${githubPath}/auth/signin`} render={() => <Auth/>}/>
							<Route exact path={`${githubPath}/create`} render={() => <CreatePost/>}/>
							<Route exact path={`${githubPath}/post/:id`} render={() => <PostPage/>}/>
							<Route exact path={`${githubPath}/user/:id`} render={() => <User/>}/>
							<Route exact path={`${githubPath}/my`} render={() => <Posts type='my'/>}/>
							<Route exact path={`${githubPath}/up-voted`} render={() => <Posts type='upvoted'/>}/>
							<Route exact path={`${githubPath}/down-voted`} render={() => <Posts type='downvoted'/>}/>
							<Route exact path={`${githubPath}/by-categories`}
								   render={() => <Posts type='categories'/>}/>
							<Route exact path={`${githubPath}/`} render={() => <Posts/>}/>
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
