import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {appReducer} from './app-reducer'
import {postsReducer} from './posts-reducer'
import {authReducer} from './auth-reducer'
import {categoriesReducer} from './categories-reducer'
import {commentsReducer} from './comments-reducer'
import {userReducer} from './user-reducer'

const reducers = combineReducers({
	auth: authReducer,
	app: appReducer,
	user: userReducer,
	posts: postsReducer,
	comments: commentsReducer,
	categories: categoriesReducer
})

type Reducers = typeof reducers
export type State = ReturnType<Reducers>

type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type ThunkType<F, A extends Action> = ThunkAction<Promise<F>, State, unknown, A>