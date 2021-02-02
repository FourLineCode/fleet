import Link from 'next/link'
import React, { useState } from 'react'
import { UserState } from '../../store/reducers/types'
import RightArrowIcon from '../../ui/icons/RightArrowIcon'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'

interface Props {
	user: UserState
}

const UserInfo = ({ user }: Props) => {
	const [showIcon, setShowIcon] = useState(false)
	const userProfileId = user.id ? user.id : user.id

	return (
		<Link href={`/profile/${userProfileId}`}>
			<a
				onMouseEnter={() => setShowIcon(true)}
				onMouseLeave={() => setShowIcon(false)}
				className='flex items-center justify-between w-full h-16 p-2 border border-gray-700 rounded-lg shadow-xl cursor-pointer group hover:bg-gray-900 hover:bg-opacity-50'
			>
				<div className='flex items-center'>
					<div className='flex items-center justify-center w-12 h-12 mr-2 overflow-hidden rounded-lg'>
						<img src='https://github.com/tnarla.png' alt='profile-photo' />
					</div>
					<div className='flex flex-col'>
						<div className='flex items-center text-white truncate'>
							<span className='group-hover:underline'>{user.displayName}</span>
							{user.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
						</div>
						<div className='text-gray-400'>@{user.username}</div>
					</div>
				</div>
				{showIcon && <RightArrowIcon className='w-5 h-5 text-gray-500' />}
			</a>
		</Link>
	)
}

export default UserInfo
