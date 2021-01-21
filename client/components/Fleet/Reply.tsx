import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { UserState } from '../../store/reducers/types'
import { ReplyType } from './FleetDetails'

interface Props {
	reply: ReplyType
	user: UserState
}

const Reply = ({ reply, user }: Props) => {
	return (
		<div className='w-full px-2 py-2 mb-3 border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex space-x-1'>
				<Link href={`/profile/${reply.user.id}`}>
					<a className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg hover:border-green-500'>
						<img
							src={
								reply.user.isAdmin
									? 'http://github.com/FourLineCode.png'
									: 'http://github.com/RobinMalfait.png'
							}
							alt='profile-photo'
						/>
					</a>
				</Link>
				<div className='text-base font-bold text-white'>
					<div>
						<div>
							<Link href={`/profile/${reply.user.id}`}>
								<a>
									<span className='font-semibold hover:underline'>{reply.user.displayName}</span>{' '}
									<span className='font-normal text-gray-400'>@{reply.user.username}</span>
								</a>
							</Link>
							{' • '}
							<span className='text-sm font-normal text-gray-400'>
								{formatDistanceToNow(new Date(reply.createdAt))}
							</span>
						</div>
						<div className='text-xs font-normal text-gray-400'>Reply to @{user.username}</div>
					</div>
					<div className='py-1 text-base font-normal text-white break-all'>{reply.body}</div>
				</div>
			</div>
		</div>
	)
}

export default Reply
