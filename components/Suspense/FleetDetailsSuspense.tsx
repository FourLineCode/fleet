import React from 'react'

const FleetDetailsSuspense = () => {
	return (
		<div className='animate-pulse'>
			<div className='border-b border-dark-700'>
				<div className='w-full'>
					<div className='flex flex-col pb-2 space-x-1 space-y-2 border-b border-dark-700'>
						<div className='flex mt-1'>
							<div className='mr-2 bg-gray-600 rounded-lg w-14 h-14' />
							<div className='space-y-1'>
								<div className='w-32 h-5 bg-gray-600 rounded' />
								<div className='w-20 h-4 bg-gray-600 rounded' />
							</div>
						</div>
						<div className='space-y-2'>
							<div className='w-full h-5 bg-gray-600 rounded' />
							<div className='w-full h-5 bg-gray-600 rounded' />
							<div className='w-2/3 h-5 bg-gray-600 rounded' />
						</div>
						<div className='flex space-x-2'>
							<div className='w-20 h-3 bg-gray-600 rounded' />
							<div className='h-3 bg-gray-600 rounded w-28' />
						</div>
					</div>
					<div className='w-full h-8 px-2 mt-1'>
						<div className='flex items-center w-full h-full'>
							<div className='flex items-center flex-1 justify-evenly'>
								<div className='flex items-center justify-evenly'>
									<div className='w-10 h-5 bg-gray-600 rounded' />
								</div>
								<div className='flex items-center'>
									<div className='w-10 h-5 bg-gray-600 rounded' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full mt-6 mb-8 space-y-4 md:mb-0'>
				{/* reply */}
				<div className='w-full px-2 py-2 mb-3 border rounded-lg shadow-xl border-dark-700'>
					<div className='flex space-x-1'>
						<div className='w-12 h-12 mt-1 mr-2 bg-gray-600 rounded-lg' />
						<div className='w-full'>
							<div className='space-y-1'>
								<div className='flex items-center justify-between w-full'>
									<div className='flex items-center space-x-1'>
										<div className='flex items-center space-x-2'>
											<span className='w-24 h-4 bg-gray-600 rounded' />
											<span className='w-16 h-4 bg-gray-600 rounded' />
										</div>
										<span className='text-white'>{' • '}</span>
										<span className='w-20 h-4 bg-gray-600 rounded' />
									</div>
								</div>
								<div className='w-24 h-3 bg-gray-600 rounded' />
							</div>
							<div className='py-2 space-y-1'>
								<div className='w-full h-4 bg-gray-600 rounded' />
								<div className='w-full h-4 bg-gray-600 rounded' />
								<div className='w-1/3 h-4 bg-gray-600 rounded' />
							</div>
						</div>
					</div>
				</div>
				<div className='w-full px-2 py-2 mb-3 border rounded-lg shadow-xl border-dark-700'>
					<div className='flex space-x-1'>
						<div className='w-12 h-12 mt-1 mr-2 bg-gray-600 rounded-lg' />
						<div className='w-full'>
							<div className='space-y-1'>
								<div className='flex items-center justify-between w-full'>
									<div className='flex items-center space-x-1'>
										<div className='flex items-center space-x-2'>
											<span className='w-20 h-4 bg-gray-600 rounded' />
											<span className='h-4 bg-gray-600 rounded w-14' />
										</div>
										<span className='text-white'>{' • '}</span>
										<span className='w-16 h-4 bg-gray-600 rounded' />
									</div>
								</div>
								<div className='w-24 h-3 bg-gray-600 rounded' />
							</div>
							<div className='py-2 space-y-1'>
								<div className='w-full h-4 bg-gray-600 rounded' />
								<div className='w-2/3 h-4 bg-gray-600 rounded' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FleetDetailsSuspense
