import React from 'react'
import Menu from '../../components/Menu'
import ProfileCard from '../../components/ProfileCard'
import ProtectedLayout from '../../components/ProtectedLayout'
import Recommend from '../../components/Recommend'

const Profile = () => {
	return (
		<ProtectedLayout title='Profile | Fleet'>
			<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
				<Menu />
				<ProfileCard />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Profile
