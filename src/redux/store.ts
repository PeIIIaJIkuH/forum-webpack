import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import auth from './auth-reducer'
import app from './app-reducer'
import posts from './posts-reducer'
import categories from './categories-reducer'

const reducers = combineReducers({
	auth,
	app,
	posts,
	categories
})

type Reducers = typeof reducers
export type State = ReturnType<Reducers>

type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store