import React from 'react'
import Menu from '../components/Menu'
import ProfileCard from '../components/ProfileCard'
import Recommend from '../components/Recommend'

const Profile = () => {
	return (
		<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<ProfileCard />
			<Recommend />
		</div>
	)
}

export default Profile
