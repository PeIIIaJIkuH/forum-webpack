import {makeAutoObservable} from 'mobx'
import authState from './authState'

class AppState {
	initialized = false
	progress = 0
	url = ''
	isMenuOpen = false

	constructor() {
		makeAutoObservable(this)
	}

	setInitialized(initialized: boolean) {
		this.initialized = initialized
	}

	setProgress(n: number) {
		this.progress = n
	}

	setUrl(url: string) {
		this.url = url
	}

	setIsMenuOpen(isOpen: boolean) {
		const htmlElement = document.getElementsByTagName('html')[0]
		if (!this.isMenuOpen) {
			htmlElement.style.overflowY = 'scroll'
		} else {
			htmlElement.style.overflowY = 'hidden'
		}
		this.isMenuOpen = isOpen
	}

	async initialize() {
		await authState.fetchUserData()
		this.setInitialized(true)
	}
}

export default new AppState()
