import React from 'react'
import Menu from '../components/Menu'
import Recommend from '../components/Recommend'
import UserProfileCard from '../components/UserProfileCard'

const UserProfile = () => {
	return (
		<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<UserProfileCard />
			<Recommend />
		</div>
	)
}

export default UserProfile
