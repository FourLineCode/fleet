import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import { setError } from '../store/actions/notificationActions'
import IconButton from '../ui/IconButton'
import HeartFilledIcon from '../ui/icons/HeartFilledIcon'
import HeartIcon from '../ui/icons/HeartIcon'
import ReplyIcon from '../ui/icons/ReplyIcon'
import { BASE_URL } from '../utils/config'
import ReplyComposer from './ReplyComposer'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
}

const Fleet = ({ fleet }: Props) => {
	const auth = useAuthorization()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const { pathname } = useRouter()

	const [showReplyComposer, setShowReplyComposer] = useState(false)
	const [liked, setLiked] = useState<boolean | null>(null)

	// TODO: make this cleaner
	const likeHandler = async () => {
		if (liked === null) return
		try {
			if (!liked) {
				await axios.post(
					`${BASE_URL}/fleet/like/${fleet.id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${auth.token}`,
						},
					}
				)
				setLiked(true)
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
				setLiked(false)
			}
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const checkLiked = async () => {
		const res = await axios.get(`${BASE_URL}/fleet/checklike/${fleet.id}`, {
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		})

		setLiked(res.data.liked)
	}

	useEffect(() => {
		checkLiked()
	}, [])

	const { mutate } = useMutation(likeHandler, {
		onSuccess: () => {
			if (pathname.startsWith('/home')) {
				queryClient.refetchQueries('fleets')
			} else if (pathname.startsWith('/profile')) {
				queryClient.refetchQueries('profile-fleets')
			}
		},
	})

	return (
		<div className='w-full px-2 pt-2 border border-gray-700 rounded-lg shadow-xl lg:mx-auto lg:w-3/4 hover:bg-gray-900 hover:bg-opacity-50'>
			<Link href={`/fleet/${fleet.id}`} passHref={true}>
				<div className='flex space-x-1 cursor-pointer'>
					<Link href={`/profile/${fleet.author.id}`}>
						<a className='flex items-center justify-center flex-shrink-0 w-12 h-12 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg hover:border-green-500'>
							<img src='http://github.com/RobinMalfait.png' alt='profile-photo' />
						</a>
					</Link>
					<div className='text-base font-bold text-white'>
						<Link href={`/profile/${fleet.author.id}`}>
							<a>
								<span className='hover:underline'>{fleet.author.displayName}</span>{' '}
								<span className='font-normal text-gray-400'>@{fleet.author.username}</span>
							</a>
						</Link>
						{' • '}
						<span className='text-sm font-normal text-gray-400'>
							{formatDistanceToNow(new Date(fleet.createdAt))}
						</span>
						<div className='text-sm font-normal text-white break-all'>{fleet.body}</div>
					</div>
				</div>
			</Link>
			<div className='flex items-center w-full h-6 mt-1 justify-evenly'>
				<div className='flex items-center'>
					<IconButton
						onClick={() => setShowReplyComposer(true)}
						className='text-white transform rounded-full hover:bg-gray-700 hover:text-green-500 hover:scale-110'
					>
						<ReplyIcon className='w-4 h-4' />
					</IconButton>
					<span className='text-base text-white'>{fleet.replies.length}</span>
				</div>
				<div className='flex items-center'>
					<IconButton
						onClick={mutate}
						className='text-white transform rounded-full hover:bg-gray-700 hover:text-green-500 hover:scale-110'
					>
						{liked ? <HeartFilledIcon className='w-4 h-4' /> : <HeartIcon className='w-4 h-4' />}
					</IconButton>
					<span className='text-base text-white'>{fleet.likes.length}</span>
				</div>
			</div>
			<ReplyComposer fleet={fleet} visible={showReplyComposer} setVisible={setShowReplyComposer} />
		</div>
	)
}

export default Fleet
