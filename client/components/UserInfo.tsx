import Link from 'next/link'
import React from 'react'
import { UserState } from '../store/reducers/types'

interface Props {
	user: UserState
}

const UserInfo = ({ user }: Props) => {
	const userProfileId = user.id ? user.id : user.id

	return (
		<div className='w-full h-16 p-2 border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex items-center'>
				<Link href={`/profile/${userProfileId}`}>
					<a className='flex items-center justify-center w-12 h-12 mr-2 overflow-hidden rounded-full'>
						<img src='http://github.com/tnarla.png' alt='profile-photo' />
					</a>
				</Link>
				<Link href={`/profile/${userProfileId}`}>
					<a className='flex flex-col'>
						<div className='text-white truncate'>{user.displayName}</div>
						<div className='text-gray-400'>@{user.username}</div>
					</a>
				</Link>
			</div>
		</div>
	)
}

export default UserInfo
