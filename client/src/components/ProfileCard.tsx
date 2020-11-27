import { format } from 'date-fns'
import React, { useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import Button from '../ui/Button'

const ProfileCard = () => {
	const [followed, setFollowed] = useState(false)
	const user = useCurrentUser()

	const handleFollow = (e: React.MouseEvent) => {
		e.preventDefault()

		setFollowed(!followed)
	}

	return (
		<div className='h-full col-span-2 border-l border-r border-gray-500'>
			<div className='relative w-full h-60'>
				<img
					className='object-cover w-full h-full'
					src='https://pbs.twimg.com/profile_banners/2163885564/1589765384/1080x360'
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
						<span className='text-3xl font-semibold text-white'>
							{user.displayName}
						</span>
						<span className='text-lg text-gray-400'>
							@{user.username}
						</span>
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
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Vitae voluptatem aliquam voluptate, sapiente
							facilis tempore.
						</div>
					</div>
					<div className='flex-grow text-right'>
						<div className='text-sm text-gray-400'>Joined</div>
						<div className='text-base text-white'>
							{format(new Date(user.createdAt!), 'd MMM, Y')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard
