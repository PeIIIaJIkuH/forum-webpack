import React, {FC} from 'react'
import s from './App.module.css'
import {Route, RouteComponentProps, Router, Switch, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {initializedSelector} from './redux/selectors'
import {InitializeApp, initializeApp, SetMenuOpen, setMenuOpen} from './redux/app-reducer'
import store, {State} from './redux/store'
import history from './history'
import Header from './components/Header/Header'
import Auth from './components/Auth/Auth'
import CreatePost from './components/CreatePost/CreatePost'
import LeftMenu from './components/LeftMenu/LeftMenu'
import Actions from './components/Actions/Actions'
import Error404 from './components/common/errors/Error404'
import AppPreloader from './components/common/preloaders/AppPreloader'
import Posts from './components/Posts/Posts'
import PostPage from './components/Posts/PostPage'
import User from './components/User/User'
import Layout from 'antd/lib/layout'
import Sider from 'antd/lib/layout/Sider'
import {Content} from 'antd/lib/layout/layout'
import Affix from 'antd/lib/affix'
import {useMediaQuery} from 'react-responsive'
import RightMenu from './components/RightMenu/RightMenu'

// TODO:
// check all the features and functions
// create new errors to authorization and edit post from address
// make all requests for several items paginated: take only some portion of it, and just scroll to request more

type Props = MapStateToProps & MapDispatchToProps & RouteComponentProps

const App: FC<Props> = ({initialized, initializeApp, setMenuOpen, location}) => {
	React.useEffect(() => {
		initializeApp()
	}, [initializeApp])

	React.useEffect(() => {
		setMenuOpen(false)
	}, [setMenuOpen, location.pathname])

	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})

	if (!initialized) {
		return <AppPreloader/>
	}

	const paths = ['/create', '/edit']

	return (
		<div className={s.App}>
			<Layout className={s.layout}>
				<Header/>
				<Layout className={s.innerLayout}>
					{!isTabletOrMobile && (
						<Affix offsetTop={105} className={`${s.affix} ${s.menu}`}>
							<Sider theme='light' trigger={null}>
								<LeftMenu/>
							</Sider>
						</Affix>
					)}
					<Content className={s.content}>
						<Switch>
							<Route exact path='/auth/signup'><Auth register/></Route>
							<Route exact path='/auth/signin'><Auth/></Route>
							<Route exact path={paths}><CreatePost/></Route>
							<Route exact path='/post/:id'><PostPage/></Route>
							<Route exact path='/user/:id'><User/></Route>
							<Route exact path='/my'><Posts type='my'/></Route>
							<Route exact path='/up-voted'><Posts type='upvoted'/></Route>
							<Route exact path='/down-voted'><Posts type='downvoted'/></Route>
							<Route exact path='/by-categories'><Posts type='categories'/></Route>
							<Route exact path='/'><Posts/></Route>
							<Route><Error404/></Route>
						</Switch>
					</Content>
					{!isTabletOrMobile && (
						<Affix offsetTop={105} className={`${s.affix} ${s.actions}`}>
							<Sider theme='light' trigger={null}>
								<Actions/>
							</Sider>
						</Affix>
					)}
					{isTabletOrMobile && (
						<RightMenu/>
					)}
				</Layout>
			</Layout>
		</div>
	)
}

type MapStateToProps = {
	initialized: boolean
}
const mapStateToProps = (state: State): MapStateToProps => ({
	initialized: initializedSelector(state)
})

type MapDispatchToProps = {
	initializeApp: InitializeApp
	setMenuOpen: SetMenuOpen
}
const mapDispatchToProps: MapDispatchToProps = {
	initializeApp,
	setMenuOpen
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

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
