import React from 'react'
import Menu from '../components/Menu'
import ProfileCard from '../components/ProfileCard'

const Profile = () => {
	return (
		<div className='grid h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<ProfileCard />
			<div className='h-full'>
				<h1 className='text-2xl text-center text-white'>Recomended</h1>
			</div>
		</div>
	)
}

export default Profile
