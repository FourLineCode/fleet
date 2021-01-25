import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import React, { useState } from 'react'
import useAuthorization from '../../hooks/useAuthorization'
import useCurrentUser from '../../hooks/useCurrentUser'
import { UserState } from '../../store/reducers/types'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { ReplyType } from './FleetDetails'
import ReplyOptions from './ReplyOptions'

interface Props {
	reply: ReplyType
	user: UserState
}

const Reply = ({ reply, user }: Props) => {
	const auth = useAuthorization()
	const currentUser = useCurrentUser()
	const [canDelete] = useState(auth.id === reply.user.id || currentUser.isAdmin)

	return (
		<div className='w-full px-2 py-2 mb-3 border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex space-x-1'>
				<Link href={`/profile/${reply.user.id}`}>
					<a className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg hover:border-green-500'>
						<img
							src={
								reply.user.isAdmin
									? 'https://github.com/FourLineCode.png'
									: 'https://github.com/RobinMalfait.png'
							}
							alt='profile-photo'
						/>
					</a>
				</Link>
				<div className='w-full text-base font-bold text-white'>
					<div>
						<div className='flex items-center justify-between w-full'>
							<div className='flex items-center space-x-1'>
								<Link href={`/profile/${reply.user.id}`}>
									<a className='flex items-center space-x-1'>
										<span className='flex items-center hover:underline'>
											<span>{reply.user.displayName}</span>
											{reply.user.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
										</span>{' '}
										<span className='font-normal text-gray-400'>@{reply.user.username}</span>
									</a>
								</Link>
								<span>{' • '}</span>
								<span className='text-sm font-normal text-gray-400'>
									{formatDistanceToNow(new Date(reply.createdAt))}
								</span>
							</div>
							{canDelete && <ReplyOptions id={reply.id} canDelete={canDelete} />}
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
