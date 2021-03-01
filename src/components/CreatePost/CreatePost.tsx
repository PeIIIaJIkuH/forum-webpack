import React, {FC, useState} from 'react'
import s from './CreatePost.module.css'
import {useSelector} from 'react-redux'
import {isAuthSelector, postToEditSelector} from '../../redux/selectors'
import {CreatePostForm} from './CreatePostForm'
import Card from 'antd/lib/card'
import {Error403} from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Error404} from '../common/errors/Error404'

type Props = RouteComponentProps

const CreatePostComponent: FC<Props> = ({location}) => {
	const isAuth = useSelector(isAuthSelector),
		postToEdit = useSelector(postToEditSelector)

	const [isFetching, setIsFetching] = useState(false)

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

export const CreatePost = withRouter(CreatePostComponent)