import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import { UserState } from '../store/reducers/types'
import Button from '../ui/Button'
import ProfileTimeline from './ProfileTimeline'

interface Params {
	id: string
}

const ProfileCard = () => {
	const auth = useAuthorization()
	const [followed, setFollowed] = useState(false)
	const { id } = useParams<Params>()
	const [data, setData] = useState<UserState>()

	const getUserData = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/user/info/${id}`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})
			setData(res.data)
		} catch (error) {
			console.log(error.response.data.message)
		}
	}

	const handleFollow = (e: React.MouseEvent) => {
		e.preventDefault()

		setFollowed(!followed)
	}

	useEffect(() => {
		getUserData()
	}, [id])

	return (
		<div className='w-full h-full col-span-2 border-l border-r border-gray-500'>
			{data && (
				<>
					<div className='relative w-full h-60'>
						<img
							className='object-cover w-full h-full'
							src='https://sweep.ac.uk/wp-content/uploads/green-banner.jpg'
							alt='profile-banner'
						/>
						<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent' />
					</div>
					<div className='flex justify-center'>
						<img
							className='z-10 w-40 h-40 overflow-hidden border-4 border-white rounded-full -mt-28'
							src='http://github.com/kesne.png'
							alt='profile-photo'
						/>
					</div>
					<div className='px-4'>
						<div className='flex items-center justify-between pb-2 text-2xl text-white border-b border-gray-500'>
							<div className='flex flex-col'>
								<span className='text-3xl font-semibold text-white'>{data?.displayName}</span>
								<span className='text-lg text-gray-400'>@{data?.username}</span>
							</div>
							<Button
								type='button'
								variant={followed ? 'filled' : 'outlined'}
								onClick={handleFollow}
								className='text-base'>
								{followed ? 'Unfollow' : 'Follow'}
							</Button>
						</div>
						<div className='flex px-4 pb-2 mt-2 border-b border-gray-500'>
							<div className='w-3/4 text-white'>
								<div className='text-sm text-gray-400'>Bio</div>
								<div>{data?.bio}</div>
							</div>
							<div className='flex-grow text-right'>
								<div className='text-sm text-gray-400'>Joined</div>
								<div className='text-base text-white'>
									{format(new Date(data?.createdAt!), 'd MMM, Y')}
								</div>
							</div>
						</div>
						<ProfileTimeline />
					</div>
				</>
			)}
		</div>
	)
}

export default ProfileCard
