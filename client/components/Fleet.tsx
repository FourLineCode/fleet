import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQueryCache } from 'react-query'
import useAuthorization from '../hooks/useAuthorization'
import useCurrentUser from '../hooks/useCurrentUser'
import IconButton from '../ui/IconButton'
import HeartFilledIcon from '../ui/icons/HeartFilledIcon'
import HeartIcon from '../ui/icons/HeartIcon'
import ReplyIcon from '../ui/icons/ReplyIcon'
import { BASE_URL } from '../utils/config'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
}

const Fleet = ({ fleet }: Props) => {
	const auth = useAuthorization()
	const user = useCurrentUser()
	const queryCache = useQueryCache()
	const { pathname } = useRouter()

	// TODO: make this cleaner
	const likeHandler = async () => {
		try {
			if (!fleet.likers.includes(user.id!)) {
				await axios.post(
					`${BASE_URL}/fleet/like/${fleet.id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${auth.token}`,
						},
					}
				)
			} else {
				await axios.post(
					`${BASE_URL}/fleet/unlike/${fleet.id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${auth.token}`,
						},
					}
				)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const [mutate] = useMutation(likeHandler, {
		onSuccess: () => {
			if (pathname.startsWith('/home')) {
				queryCache.refetchQueries('fleets')
			} else if (pathname.startsWith('/profile')) {
				queryCache.refetchQueries('profile-fleets')
			}
		},
	})

	return (
		<div className='w-full px-2 pt-2 border border-gray-700 rounded-lg shadow-xl cursor-pointer lg:mx-auto lg:w-3/4 hover:bg-gray-900 hover:bg-opacity-50'>
			<div className='flex space-x-1'>
				<Link href={`/profile/${fleet.author.id}`}>
					<a className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg hover:border-green-500'>
						<img src='http://github.com/kesne.png' alt='profile-photo' />
					</a>
				</Link>
				<div>
					<Link href={`/profile/${fleet.author.id}`}>
						<a className='text-base font-bold text-white'>
							<span className='hover:underline'>{fleet.author.displayName}</span>{' '}
							<span className='font-normal text-gray-400'>@{fleet.author.username}</span>
							{' • '}
							<span className='text-sm font-normal text-gray-400'>
								{formatDistanceToNow(new Date(fleet.createdAt))}
							</span>
						</a>
					</Link>
					<div className='text-sm text-white break-all'>{fleet.body}</div>
				</div>
			</div>
			<div className='flex items-center w-full h-6 justify-evenly'>
				<IconButton
					onClick={() => {}}
					className='text-white transform rounded-full hover:bg-gray-700 hover:text-green-500 hover:scale-125'
				>
					<ReplyIcon className='w-4 h-4' />
				</IconButton>
				<div className='flex items-center'>
					<IconButton
						onClick={mutate}
						className='text-white transform rounded-full hover:bg-gray-700 hover:text-green-500 hover:scale-125'
					>
						{fleet.likers.includes(user.id!) ? (
							<HeartFilledIcon className='w-4 h-4' />
						) : (
							<HeartIcon className='w-4 h-4' />
						)}
					</IconButton>
					<span className='text-base text-white'>{fleet.likes}</span>
				</div>
			</div>
		</div>
	)
}

export default Fleet
