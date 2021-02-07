import React from 'react'
import Preloader from '../components/common/preloaders/Preloader'

export const withSuspense = Component => props => (
	<React.Suspense fallback={<Preloader/>}>
		<Component {...props}/>
	</React.Suspense>
)
