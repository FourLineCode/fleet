import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { queryCache } from 'react-query'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import { UserState } from '../store/reducers/types'
import Button from '../ui/Button'

interface Props {
	user: UserState
	showButton?: boolean
}

const UserInfo = ({ user, showButton = true }: Props) => {
	const auth = useAuthorization()
	const [followed, setFollowed] = useState(false)

	const handleFollow = async (e: React.MouseEvent) => {
		e.preventDefault()

		try {
			if (!followed) {
				const res = await axios.post(
					`${BASE_URL}/follow/${user._id}`,
					{},
					{
						headers: {
							authorization: `Bearer ${auth.token}`,
						},
					}
				)

				setFollowed(res.data.success)
			} else {
				const res = await axios.post(
					`${BASE_URL}/follow/unfollow/${user._id}`,
					{},
					{
						headers: {
							authorization: `Bearer ${auth.token}`,
						},
					}
				)

				setFollowed(!res.data.success)
			}
			queryCache.refetchQueries('is-following')
		} catch (error) {
			console.log(error.response.data)
		}
	}

	const checkFollowed = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/follow/check/${user._id}`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})

			setFollowed(res.data.follows)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	useEffect(() => {
		checkFollowed()
	}, [user])

	return (
		<div className='flex justify-between w-full h-16 p-2 border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex items-center'>
				<Link to={`/profile/${user._id}`}>
					<div className='flex items-center justify-center w-12 h-12 mr-2 overflow-hidden rounded-full'>
						<img src='http://github.com/tnarla.png' />
					</div>
				</Link>
				<Link to={`/profile/${user._id}`}>
					<div className='flex flex-col'>
						<div className='text-white truncate'>{user.displayName}</div>
						<div className='text-gray-400'>@{user.username}</div>
					</div>
				</Link>
			</div>
			{showButton && (
				<Button type='button' variant={followed ? 'filled' : 'outlined'} onClick={handleFollow}>
					{followed ? 'Unfollow' : 'Follow'}
				</Button>
			)}
		</div>
	)
}

export default UserInfo
