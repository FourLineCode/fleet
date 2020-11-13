import React from 'react'
import Menu from '../components/Menu'
import Timeline from '../components/Timeline'

const Home = () => {
	return (
		<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<Timeline />
			<div className='h-full'>
				<h1 className='text-2xl text-center text-white'>Recomended</h1>
			</div>
		</div>
	)
}

export default Home
