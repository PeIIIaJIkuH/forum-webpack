export const getInitializedSelector = state => state.app.initialized

export const getUsernameSelector = state => state.auth.username

export const getIsAuthSelector = state => state.auth.isAuth

export const getCategoriesSelector = state => state.categories.data

export const getUserSelector = state => state.posts.user

export const getPostsSelector = state => state.posts.posts

export const getCommentsSelector = state => state.posts.comments

export const getUserIDSelector = state => state.auth.id

export const getMenuOptionSelector = state => state.menu.option