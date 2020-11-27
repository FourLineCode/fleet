import React, { useState } from 'react'
import Button from '../ui/Button'

const UserInfo = () => {
	const [followed, setFollowed] = useState(false)

	const handleFollow = (e: React.MouseEvent) => {
		e.preventDefault()

		setFollowed(!followed)
	}

	return (
		<div className='flex justify-between w-full h-16 p-2 border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex items-center'>
				<div className='flex items-center justify-center w-12 h-12 mr-2 overflow-hidden rounded-full'>
					<img src='http://github.com/tnarla.png' />
				</div>
				<div className='flex flex-col'>
					<div className='text-white'>Tru Narla</div>
					<div className='text-gray-400'>@tnarla</div>
				</div>
			</div>
			<Button
				type='button'
				onClick={handleFollow}
				variant={followed ? 'filled' : 'outlined'}>
				{followed ? 'Unfollow' : 'Follow'}
			</Button>
		</div>
	)
}

export default UserInfo
