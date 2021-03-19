import TimelineSuspense from './TimelineSuspense'

const ProfileSuspense = () => {
	return (
		<div className='w-full h-full col-span-4 border-dark-500 animate-pulse md:col-span-3 xl:col-span-2 md:border-l lg:border-r'>
			<div className='flex flex-col items-center'>
				<div className='w-full bg-gray-300 dark:bg-gray-600 h-60' />
				<div className='w-40 h-40 bg-gray-200 dark:bg-gray-500 rounded-xl -mt-28' />
			</div>
			<div className='px-2 mt-2'>
				<div className='flex items-center justify-between pb-2 border-b border-dark-500'>
					<div className='flex flex-col space-y-2'>
						<div className='h-6 bg-gray-300 rounded dark:bg-gray-600 w-52' />
						<div className='w-32 h-6 bg-gray-300 rounded dark:bg-gray-600' />
					</div>
					<div className='w-20 h-10 bg-gray-300 rounded-lg dark:bg-gray-600' />
				</div>
				<div className='flex px-4 pb-2 mt-2 border-b border-dark-500'>
					<div className='w-3/4 text-white'>
						<div className='text-sm text-gray-600 dark:text-gray-400'>Bio</div>
						<div className='w-3/4 h-4 bg-gray-300 rounded dark:bg-gray-600' />
					</div>
					<div className='flex-1'>
						<div className='flex justify-end text-sm text-gray-600 dark:text-gray-400'>Joined</div>
						<div className='flex justify-end'>
							<div className='w-20 h-4 bg-gray-300 rounded dark:bg-gray-600' />
						</div>
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='w-16 border-b-2 border-brand-400'>
						<div className='text-xl font-bold text-center text-black dark:text-white'>Posts</div>
					</div>
				</div>
				<div className='flex flex-col items-center justify-center h-full pb-2 my-4 mb-8 space-y-4 md:mb-0'>
					<TimelineSuspense />
				</div>
			</div>
		</div>
	)
}

export default ProfileSuspense
