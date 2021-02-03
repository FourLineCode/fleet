import React from 'react'

const RecommendSuspense = () => {
	return (
		<>
			<div className='flex items-center justify-between w-full h-16 p-2 border border-dark-700 rounded-lg shadow-xl animate-pulse'>
				<div className='flex items-center flex-1'>
					<div className='w-12 h-12 mr-2 bg-gray-400 rounded-lg' />
					<div className='flex flex-col flex-1 space-y-2'>
						<div className='w-2/3 h-4 bg-gray-400 rounded' />
						<div className='w-1/3 h-4 bg-gray-400 rounded' />
					</div>
				</div>
			</div>
			<div className='flex items-center justify-between w-full h-16 p-2 border border-dark-700 rounded-lg shadow-xl animate-pulse'>
				<div className='flex items-center flex-1'>
					<div className='w-12 h-12 mr-2 bg-gray-400 rounded-lg' />
					<div className='flex flex-col flex-1 space-y-2'>
						<div className='w-3/4 h-4 bg-gray-400 rounded' />
						<div className='w-1/4 h-4 bg-gray-400 rounded' />
					</div>
				</div>
			</div>
			<div className='flex items-center justify-between w-full h-16 p-2 border border-dark-700 rounded-lg shadow-xl animate-pulse'>
				<div className='flex items-center flex-1'>
					<div className='w-12 h-12 mr-2 bg-gray-400 rounded-lg' />
					<div className='flex flex-col flex-1 space-y-2'>
						<div className='w-3/5 h-4 bg-gray-400 rounded' />
						<div className='w-1/2 h-4 bg-gray-400 rounded' />
					</div>
				</div>
			</div>
		</>
	)
}

export default RecommendSuspense
