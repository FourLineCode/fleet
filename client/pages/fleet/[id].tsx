import React from 'react'
import FleetDetails from '../../components/FleetDetails'
import Menu from '../../components/Menu'
import ProtectedLayout from '../../components/ProtectedLayout'
import Recommend from '../../components/Recommend'

const Profile = () => {
	return (
		<ProtectedLayout title='Post | Fleet'>
			<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
				<Menu />
				<FleetDetails />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Profile
