import React from 'react'
import './App.css'
import {Route, Router, Switch} from 'react-router-dom'
import Preloader from './components/common/Preloader/Preloader'
import {connect, Provider} from 'react-redux'
import {getInitializedSelector, getIsAuthSelector} from './redux/selectors'
import {initializeApp} from './redux/app-reducer'
import store from './redux/store'
import Auth from './components/Auth/Auth'
import {signout} from './redux/auth-reducer'
import history from './history'
import Header from './components/Header/Header'
import CreatePost from './components/CreatePost/CreatePost'
import {Col, Row} from 'antd'
import LeftMenu from './components/LeftMenu/LeftMenu'
import Actions from './components/Actions/Actions'
import User from './components/User/User'
import PostPage from './components/Posts/PostComment'
import MyPosts from './components/Posts/MyPosts'
import UpVotedPosts from './components/Posts/UpVotedPosts'
import DownVotedPosts from './components/Posts/DownVotedPosts'
import AllPosts from './components/Posts/AllPosts'
import {Error404} from './components/common/errors'

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
					<Header/>
					<Row className='main'>
						<Col span={3} offset={3}><LeftMenu/></Col>
						<Col span={10} offset={1}>
							<Switch>
								<Route exact path='/signup' render={() => <Auth isSignup={true}/>}/>
								<Route exact path='/signin' render={() => <Auth isSignup={false}/>}/>
								<Route exact path='/create' render={() => <CreatePost/>}/>
								<Route exact path='/post/:id' render={() => <PostPage/>}/>
								<Route exact path='/user/:id' render={() => <User/>}/>
								<Route exact path='/my' render={() => <MyPosts/>}/>
								<Route exact path='/upVoted' render={() => <UpVotedPosts/>}/>
								<Route exact path='/downVoted' render={() => <DownVotedPosts/>}/>
								<Route exact path='/' render={() => <AllPosts/>}/>
								<Route render={() => <Error404/>}/>
							</Switch>
						</Col>
						<Col span={3} offset={1}><Actions isAuth={this.props.isAuth}/></Col>
					</Row>
				</React.Suspense>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	initialized: getInitializedSelector(state),
	isAuth: getIsAuthSelector(state)
})

const mapDispatchToProps = {
	initializeApp,
	signout
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
