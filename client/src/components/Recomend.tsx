import React from 'react'
import UserInfo from './UserInfo'

const Recomend = () => {
	return (
		<div className='h-full p-4'>
			<div className='w-full px-4 pt-2 pb-4 border border-gray-700 rounded-lg shadow-xl'>
				<div className='mb-2 text-lg text-white'>
					People you may know
				</div>
				<div className='flex flex-col space-y-4'>
					<UserInfo />
					<UserInfo />
					<UserInfo />
					<UserInfo />
				</div>
			</div>
		</div>
	)
}

export default Recomend
