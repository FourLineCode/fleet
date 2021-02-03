import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
}

const FleetPreview = ({ fleet }: Props) => {
	return (
		<div className='w-full px-2 py-2 mb-3 border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex space-x-1'>
				<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg'>
					<img
						src={
							fleet.author.isAdmin
								? 'https://github.com/FourLineCode.png'
								: 'https://github.com/RobinMalfait.png'
						}
						alt='profile-photo'
					/>
				</div>
				<div>
					<div className='text-base font-bold text-white'>
						<div className='flex items-center space-x-1'>
							<a className='flex items-center space-x-1'>
								<span className='flex items-center'>
									<span className='line-clamp-1'>{fleet.author.displayName}</span>
									{fleet.author.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
								</span>{' '}
								<span className='font-normal text-gray-400 truncate'>@{fleet.author.username}</span>
							</a>
							<span>{' • '}</span>
							<span className='text-sm font-normal text-gray-400 line-clamp-1'>
								{formatDistanceToNow(new Date(fleet.createdAt))}
							</span>
						</div>
					</div>
					<div className='overflow-hidden text-sm text-white break-all'>{fleet.body}</div>
				</div>
			</div>
		</div>
	)
}

export default FleetPreview
