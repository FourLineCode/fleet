import React from 'react'
import ErrorIcon from '../ui/icons/ErrorIcon'

const NotFound = () => {
	return (
		<div className='flex items-center justify-center w-full h-screen bg-gray-800'>
			<div className='flex-col'>
				<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
				<div className='text-2xl font-semibold text-gray-500'>
					Page not found
				</div>
			</div>
		</div>
	)
}

export default NotFound
