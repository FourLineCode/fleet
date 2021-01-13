import React from 'react'
import Menu from '../components/Menu'
import ProtectedLayout from '../components/ProtectedLayout'
import Recommend from '../components/Recommend'
import Timeline from '../components/Timeline'

const Home = () => {
	return (
		<ProtectedLayout title='Home | Fleet'>
			<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
				<Menu />
				<Timeline />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Home
