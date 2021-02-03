import React from 'react'

interface Props {
	isAdmin: boolean
}

const ProfileBanner = ({ isAdmin }: Props) => {
	return (
		<>
			<div className='relative w-full h-60'>
				<img
					className='object-cover w-full h-full'
					src='https://images6.fanpop.com/image/photos/39600000/Sparkle-Stars-Profile-Banner-smile19-39654242-946-250.jpg'
					alt='profile-banner'
				/>
				<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark-900 to-transparent' />
			</div>
			<div className='flex justify-center'>
				<img
					className='z-10 w-40 h-40 overflow-hidden border-4 border-white rounded-xl -mt-28'
					src={isAdmin ? 'https://github.com/FourLineCode.png' : 'https://github.com/RobinMalfait.png'}
					alt='profile-photo'
				/>
			</div>
		</>
	)
}

export default ProfileBanner
