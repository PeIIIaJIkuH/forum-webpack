import React, {FC, useEffect, useState} from 'react'
import s from './CreatePost.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {isAuthSelector, postToEditSelector} from '../../redux/selectors'
import {CreatePostForm} from './CreatePostForm'
import Card from 'antd/lib/card'
import {Error403} from '../common/errors/Error403'
import {Helmet} from 'react-helmet'
import {useLocation} from 'react-router-dom'
import {Error404} from '../common/errors/Error404'
import * as queryString from 'query-string'
import {postAPI} from '../../api/requests'
import {TPost} from '../../types/types'
import {setPostToEdit} from '../../redux/posts-reducer'

export const CreatePost: FC = () => {
	const isAuth = useSelector(isAuthSelector),
		postToEdit = useSelector(postToEditSelector),
		location = useLocation()

	const dispatch = useDispatch()

	useEffect(() => {
		const initialize = async () => {
			const parsed = queryString.parse(location.search)
			const id = parseInt(parsed.id as string)
			if (!isNaN(id)) {
				const data = await postAPI.get(id)
				if (data && data.status) {
					const post = data.data as TPost
					await dispatch(setPostToEdit(post))
				}
			}
		}
		initialize().then()
	}, [location.search, dispatch])

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