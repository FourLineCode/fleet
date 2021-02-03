import { format } from 'date-fns'
import React from 'react'

interface Props {
	bio: string | null
	createdAt: string | null
}

const ProfileInfo = ({ bio, createdAt }: Props) => {
	return (
		<div className='flex px-4 pb-2 mt-2 border-b border-dark-500'>
			<div className='w-3/4 text-white'>
				<div className='text-sm text-gray-400'>Bio</div>
				<div>{bio}</div>
			</div>
			<div className='flex-grow text-right'>
				<div className='text-sm text-gray-400'>Joined</div>
				<div className='text-base text-white'>{format(new Date(createdAt!), 'd MMM, Y')}</div>
			</div>
		</div>
	)
}

export default ProfileInfo
