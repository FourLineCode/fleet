import React from 'react'

const TimelineSuspense = () => {
	return (
		<>
			<div className='w-full px-2 pt-2 border border-gray-700 rounded-lg shadow-xl animate-pulse lg:mx-auto lg:w-3/4'>
				<div className='flex space-x-1'>
					<div className='flex-shrink-0 w-12 h-12 mr-2 bg-gray-400 rounded-lg' />
					<div className='w-full space-y-2'>
						<div className='flex items-center space-x-1'>
							<div className='flex items-center space-x-1'>
								<div className='h-4 bg-gray-400 rounded w-28' />
								<div className='w-20 h-4 bg-gray-400 rounded' />
							</div>
						</div>
						<div className='space-y-1'>
							<div className='w-full h-4 bg-gray-400 rounded' />
							<div className='w-2/3 h-4 bg-gray-400 rounded' />
						</div>
					</div>
				</div>
				<div className='w-full h-6 mt-1'>
					<div className='flex items-center w-full h-full'>
						<div className='flex items-center flex-1 justify-evenly'>
							<div className='flex items-center justify-evenly'>
								<div className='w-8 h-4 bg-gray-400 rounded' />
							</div>
							<div className='flex items-center'>
								<div className='w-8 h-4 bg-gray-400 rounded' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full px-2 pt-2 border border-gray-700 rounded-lg shadow-xl animate-pulse lg:mx-auto lg:w-3/4'>
				<div className='flex space-x-1'>
					<div className='flex-shrink-0 w-12 h-12 mr-2 bg-gray-400 rounded-lg' />
					<div className='w-full space-y-2'>
						<div className='flex items-center space-x-1'>
							<div className='flex items-center space-x-1'>
								<div className='h-4 bg-gray-400 rounded w-28' />
								<div className='w-20 h-4 bg-gray-400 rounded' />
							</div>
						</div>
						<div className='space-y-1'>
							<div className='w-full h-4 bg-gray-400 rounded' />
							<div className='w-1/3 h-4 bg-gray-400 rounded' />
							<div className='w-full h-64 bg-gray-400 rounded' />
						</div>
					</div>
				</div>
				<div className='w-full h-6 mt-1'>
					<div className='flex items-center w-full h-full'>
						<div className='flex items-center flex-1 justify-evenly'>
							<div className='flex items-center justify-evenly'>
								<div className='w-8 h-4 bg-gray-400 rounded' />
							</div>
							<div className='flex items-center'>
								<div className='w-8 h-4 bg-gray-400 rounded' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full px-2 pt-2 border border-gray-700 rounded-lg shadow-xl animate-pulse lg:mx-auto lg:w-3/4'>
				<div className='flex space-x-1'>
					<div className='flex-shrink-0 w-12 h-12 mr-2 bg-gray-400 rounded-lg' />
					<div className='w-full space-y-2'>
						<div className='flex items-center space-x-1'>
							<div className='flex items-center space-x-1'>
								<div className='h-4 bg-gray-400 rounded w-28' />
								<div className='w-20 h-4 bg-gray-400 rounded' />
							</div>
						</div>
						<div className='space-y-1'>
							<div className='w-full h-4 bg-gray-400 rounded' />
							<div className='w-1/3 h-4 bg-gray-400 rounded' />
							<div className='flex w-full h-64 space-x-1'>
								<div className='w-2/3 h-full bg-gray-400 rounded' />
								<div className='flex flex-col flex-1 h-full space-y-1'>
									<div className='flex-1 w-full bg-gray-400 rounded' />
									<div className='flex-1 w-full bg-gray-400 rounded' />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full h-6 mt-1'>
					<div className='flex items-center w-full h-full'>
						<div className='flex items-center flex-1 justify-evenly'>
							<div className='flex items-center justify-evenly'>
								<div className='w-8 h-4 bg-gray-400 rounded' />
							</div>
							<div className='flex items-center'>
								<div className='w-8 h-4 bg-gray-400 rounded' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default TimelineSuspense
