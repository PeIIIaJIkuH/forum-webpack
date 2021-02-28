import React, {FC} from 'react'
import s from './CreatePost.module.css'
import {connect} from 'react-redux'
import {isAuthSelector, postToEditSelector} from '../../redux/selectors'
import CreatePostForm from './CreatePostForm'
import Card from 'antd/lib/card'
import Error403 from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Error404 from '../common/errors/Error404'
import {TPost} from '../../types/types'
import {State} from '../../redux/store'

type Props = MapStateToProps & MapDispatchToProps & RouteComponentProps

const CreatePost: FC<Props> = ({isAuth, postToEdit, location}) => {
	const [isFetching, setIsFetching] = React.useState(false)

	if (!isAuth)
		return <Error403/>
	if (location.pathname.indexOf('/edit') === 0 && !postToEdit)
		return <Error404/>

	return <>
		<Helmet><title>Create Post | forume</title></Helmet>
		<div className={s.wrapper}>
			<Card className={s.card} title={(postToEdit ? 'Edit' : 'Create') + ' post'}
				  headStyle={{fontSize: '20px', fontWeight: 600}}>
				<CreatePostForm setIsFetching={setIsFetching} isFetching={isFetching}/>
			</Card>
		</div>
	</>
}

type MapStateToProps = {
	isAuth: boolean
	postToEdit: TPost | null
}
const mapStateToProps = (state: State): MapStateToProps => ({
	isAuth: isAuthSelector(state),
	postToEdit: postToEditSelector(state)
})

type MapDispatchToProps = {}
const mapDispatchToProps: MapDispatchToProps = {}

export default connect<MapStateToProps, MapDispatchToProps, unknown, State>(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost))