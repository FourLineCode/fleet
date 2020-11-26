import React from 'react'

const ProfileCard = () => {
	return (
		<div className='h-full col-span-2 border-l border-r border-gray-500'>
			<div className='relative w-full h-60'>
				<img
					className='object-cover w-full h-full'
					src='https://pbs.twimg.com/profile_banners/2244953047/1562036106/1500x500'
					alt='profile-banner'
				/>
				<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent' />
			</div>
			<div className='flex justify-center'>
				<img
					className='z-10 w-40 h-40 -mt-20 overflow-hidden border border-white rounded-full'
					src='http://github.com/kesne.png'
					alt='profile-photo'
				/>
			</div>
			<div className='flex justify-between text-2xl text-white'>
				<div>username</div>
				<div>buttons</div>
			</div>
		</div>
	)
}

export default ProfileCard
