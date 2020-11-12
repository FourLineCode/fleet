import React from 'react'
import Menu from '../components/Menu'

const Messages = () => {
	return (
		<div className='grid h-screen grid-cols-4 bg-gray-800 gap-x-4'>
			<Menu />
			<div className='h-full border-l border-r border-gray-500'>
				<h1 className='text-2xl text-center text-white'>People</h1>
			</div>
			<div className='h-full col-span-2'>
				<h1 className='text-2xl text-center text-white'>Messages</h1>
			</div>
		</div>
	)
}

export default Messages
