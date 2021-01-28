import Preloader from '../components/common/Preloader/Preloader'
import React from 'react'

export const withSuspense = Component => props => (
	<React.Suspense fallback={<Preloader/>}>
		<Component {...props}/>
	</React.Suspense>
)
