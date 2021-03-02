import React, {FC, useEffect} from 'react'
import s from './App.module.css'
import {BrowserRouter, Route, Switch, useLocation} from 'react-router-dom'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {initializedSelector} from './redux/selectors'
import {initializeApp, setMenuOpen} from './redux/app-reducer'
import {store} from './redux/store'
import {Header} from './components/Header/Header'
import {Auth} from './components/Auth/Auth'
import {CreatePost} from './components/CreatePost/CreatePost'
import {LeftMenu} from './components/LeftMenu/LeftMenu'
import {Actions} from './components/Actions/Actions'
import {Error404} from './components/common/errors/Error404'
import {AppPreloader} from './components/common/preloaders/AppPreloader'
import {Posts} from './components/Posts/Posts'
import {PostPage} from './components/Posts/PostPage'
import {User} from './components/User/User'
import Layout from 'antd/lib/layout'
import Sider from 'antd/lib/layout/Sider'
import {Content} from 'antd/lib/layout/layout'
import Affix from 'antd/lib/affix'
import {useMediaQuery} from 'react-responsive'
import {RightMenu} from './components/RightMenu/RightMenu'

// FEATURES:
// Load posts, comments, ratings, notifications
// Create/edit/delete post/comment/notification
// Rate post, comment
// Change posts type: all, my, upvoted, downvoted, by-categories, on user page: created, upvoted, downvoted, commented

// TODO:
// check all the features and functions
// make all requests for several items paginated: take only some portion of it, and just scroll to request more
// try to remove return from reducers
// change all withRouter to useMatch

const App: FC = () => {
	const initialized = useSelector(initializedSelector),
		location = useLocation()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeApp())
	}, [dispatch])

	useEffect(() => {
		dispatch(setMenuOpen(false))
	}, [dispatch, location.pathname])

	const isTabletOrMobile = useMediaQuery({maxWidth: 1200})

	if (!initialized)
		return <AppPreloader/>

	return (
		<div className={s.App}>
			<Layout className={s.layout}>
				<Header/>
				<Layout className={s.innerLayout}>
					{!isTabletOrMobile && <>
						<Affix offsetTop={105} className={`${s.affix} ${s.menu}`}>
							<Sider theme='light' trigger={null} className={s.sider}>
								<LeftMenu/>
							</Sider>
						</Affix>
					</>}
					<Content className={s.content}>
						<Switch>
							<Route exact path='/auth/signup'><Auth register/></Route>
							<Route exact path='/auth/signin'><Auth/></Route>
							<Route exact path={['/create', '/edit']}><CreatePost/></Route>
							<Route exact path='/post/:id'><PostPage/></Route>
							<Route exact path='/user/:id'><User/></Route>
							<Route exact path='/my'><Posts type='my'/></Route>
							<Route exact path='/up-voted'><Posts type='up-voted'/></Route>
							<Route exact path='/down-voted'><Posts type='down-voted'/></Route>
							<Route exact path='/by-categories'><Posts type='categories'/></Route>
							<Route exact path='/'><Posts/></Route>
							<Route><Error404/></Route>
						</Switch>
					</Content>
					{!isTabletOrMobile && <>
						<Affix offsetTop={105} className={`${s.affix} ${s.actions}`}>
							<Sider theme='light' trigger={null} className={s.sider}>
								<Actions/>
							</Sider>
						</Affix>
					</>}
					{isTabletOrMobile && <RightMenu/>}
				</Layout>
			</Layout>
		</div>
	)
}

export const MainApp = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<App/>
			</Provider>
		</BrowserRouter>
	)
}
