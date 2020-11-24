import React from 'react'
import Menu from '../components/Menu'
import Recomend from '../components/Recomend'
import Timeline from '../components/Timeline'

const Home = () => {
	return (
		<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<Timeline />
			<Recomend />
		</div>
	)
}

export default Home
