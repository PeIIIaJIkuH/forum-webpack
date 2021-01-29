export const getUsernameSelector = state => state.auth.username

export const getIsAuthSelector = state => state.auth.isAuth

export const getProfileSelector = state => ({
	id: state.auth.id,
	username: state.auth.username,
	email: state.auth.email,
	createdAt: state.auth.createdAt,
	lastActive: state.auth.lastActive
})