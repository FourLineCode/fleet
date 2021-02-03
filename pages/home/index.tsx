import React from 'react'
import Timeline from '../../components/Fleet/Timeline'
import ProtectedLayout from '../../components/Layouts/ProtectedLayout'
import Menu from '../../components/Navigation/Menu'
import Recommend from '../../components/Recommend/Recommend'

const Home = () => {
	return (
		<ProtectedLayout title='Home | Fleet'>
			<div className='grid min-h-screen grid-cols-4 bg-dark-800 gap-x-1 xl:gap-x-4'>
				<Menu />
				<Timeline />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Home
