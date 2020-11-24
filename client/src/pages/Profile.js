import React from 'react'
import Menu from '../components/Menu'
import ProfileCard from '../components/ProfileCard'
import Recomend from '../components/Recomend'

const Profile = () => {
	return (
		<div className='grid h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<ProfileCard />
			<Recomend />
		</div>
	)
}

export default Profile
