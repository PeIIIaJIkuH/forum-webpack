import {State} from './store'

export const appSelector = (state: State) => state.app
export const initializedSelector = (state: State) => appSelector(state).initialized
export const progressSelector = (state: State) => appSelector(state).progress
export const urlToSelector = (state: State) => appSelector(state).urlTo
export const menuOpenSelector = (state: State) => appSelector(state).menuOpen

export const authSelector = (state: State) => state.auth
export const isAuthSelector = (state: State) => authSelector(state).isAuth
export const userIDSelector = (state: State) => authSelector(state).id
export const usernameSelector = (state: State) => authSelector(state).username
export const notificationsSelector = (state: State) => authSelector(state).notifications

export const userReducerSelector = (state: State) => state.user
export const userSelector = (state: State) => userReducerSelector(state).user

export const postsReducerSelector = (state: State) => state.posts
export const postsSelector = (state: State) => postsReducerSelector(state).all
export const postToEditSelector = (state: State) => postsReducerSelector(state).toEdit

export const commentsReducerSelector = (state: State) => state.comments
export const commentsSelector = (state: State) => commentsReducerSelector(state).all
export const userCommentsSelector = (state: State) => commentsReducerSelector(state).userComments

export const categoriesReducerSelector = (state: State) => state.categories
export const categoriesSelector = (state: State) => categoriesReducerSelector(state).all
export const selectedCategoriesSelector = (state: State) => categoriesReducerSelector(state).selected
