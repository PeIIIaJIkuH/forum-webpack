export const initializedSelector = state => state.app.initialized
export const progressSelector = state => state.app.progress
export const urlToSelector = state => state.app.urlTo
export const menuOpenSelector = state => state.app.menuOpen

export const isAuthSelector = state => state.auth.isAuth
export const userIDSelector = state => state.auth.id
export const usernameSelector = state => state.auth.username
export const notificationsSelector = state => state.auth.notifications

export const userSelector = state => state.posts.user
export const postsSelector = state => state.posts.posts
export const commentsSelector = state => state.posts.comments
export const postToEditSelector = state => state.posts.postToEdit
export const userCommentsSelector = state => state.posts.userComments

export const categoriesSelector = state => state.categories.data
