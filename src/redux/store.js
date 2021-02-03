import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import auth from './auth-reducer'
import app from './app-reducer'
import posts from './posts-reducer'


const reducers = combineReducers({
	auth,
	app,
	posts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store