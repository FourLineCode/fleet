import React from 'react'
import ProtectedLayout from '../../components/Layouts/ProtectedLayout'
import Menu from '../../components/Navigation/Menu'

const Messages = () => {
	return (
		<ProtectedLayout title='Messages | Fleet'>
			<div className='grid min-h-screen grid-cols-4 bg-gray-800 gap-x-4'>
				<Menu />
				<div className='h-full border-r border-gray-500 md:border-l md:'>
					<h1 className='text-2xl text-center text-white'>People</h1>
				</div>
				<div className='h-full col-span-2'>
					<h1 className='text-2xl text-center text-white'>Messages</h1>
				</div>
			</div>
		</ProtectedLayout>
	)
}

export default Messages
