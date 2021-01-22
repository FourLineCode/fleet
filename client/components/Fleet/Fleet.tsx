import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../../hooks/useAuthorization'
import useCurrentUser from '../../hooks/useCurrentUser'
import { setError } from '../../store/actions/notificationActions'
import IconButton from '../../ui/components/IconButton'
import HeartFilledIcon from '../../ui/icons/HeartFilledIcon'
import HeartIcon from '../../ui/icons/HeartIcon'
import ReplyIcon from '../../ui/icons/ReplyIcon'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { BASE_URL } from '../../utils/config'
import FleetOptions from './FleetOptions'
import ReplyComposer from './ReplyComposer'
import { FleetType } from './Timeline'

interface Props {
	fleet: FleetType
}

const Fleet = ({ fleet }: Props) => {
	const auth = useAuthorization()
	const user = useCurrentUser()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const { pathname } = useRouter()

	const [showReplyComposer, setShowReplyComposer] = useState(false)
	const [liked, setLiked] = useState<boolean>(fleet.liked)
	const [canDelete] = useState(auth.id === fleet.author.id || user.isAdmin)

	// TODO: make this cleaner
	const likeHandler = async () => {
		try {
			if (!liked) {
				setLiked(true)
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
				setLiked(false)
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
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

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
							<img
								src={
									fleet.author.isAdmin
										? 'http://github.com/FourLineCode.png'
										: 'http://github.com/RobinMalfait.png'
								}
								alt='profile-photo'
							/>
						</a>
					</Link>
					<div className='w-full text-base font-bold text-white'>
						<div className='flex items-center space-x-1'>
							<Link href={`/profile/${fleet.author.id}`}>
								<a className='flex items-center space-x-1'>
									<span className='flex items-center hover:underline'>
										<span>{fleet.author.displayName}</span>
										{fleet.author.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
									</span>{' '}
									<span className='font-normal text-gray-400'>@{fleet.author.username}</span>
								</a>
							</Link>
							<span>{' • '}</span>
							<span className='text-sm font-normal text-gray-400'>
								{formatDistanceToNow(new Date(fleet.createdAt))}
							</span>
						</div>
						<div className='text-sm font-normal text-white break-all'>{fleet.body}</div>
					</div>
				</div>
			</Link>
			<div className='w-full h-6 mt-1'>
				<div className='flex items-center w-full h-full'>
					<div className='flex items-center flex-1 justify-evenly'>
						<div className='flex items-center justify-evenly'>
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
					<FleetOptions id={fleet.id} canDelete={canDelete} />
				</div>
			</div>
			<ReplyComposer fleet={fleet} visible={showReplyComposer} setVisible={setShowReplyComposer} />
		</div>
	)
}

export default Fleet
