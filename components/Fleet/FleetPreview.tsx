import { formatDistanceToNow } from 'date-fns'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
}

const FleetPreview = ({ fleet }: Props) => {
	return (
		<div className='w-full px-2 py-2 mb-3 border rounded-lg shadow-xl border-dark-700'>
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
					<div className='mb-2 text-base font-bold text-black dark:text-white'>
						<div className='flex items-center space-x-1'>
							<a className='flex items-center space-x-1'>
								<span className='flex items-center'>
									<span className='line-clamp-1'>{fleet.author.displayName}</span>
									{fleet.author.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
								</span>{' '}
								<span className='font-normal text-gray-600 truncate dark:text-gray-400'>
									@{fleet.author.username}
								</span>
							</a>
						</div>
						<div className='text-sm font-normal text-gray-600 dark:text-gray-400 line-clamp-1'>
							{formatDistanceToNow(new Date(fleet.createdAt))}
						</div>
					</div>
					<div className='overflow-hidden text-sm text-black break-all dark:text-white'>{fleet.body}</div>
				</div>
			</div>
		</div>
	)
}

export default FleetPreview
