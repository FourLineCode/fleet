import axios from 'axios'
import { format } from 'date-fns'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
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
	liked: boolean | null
	setLiked: Dispatch<SetStateAction<boolean | null>>
}

const FleetView = ({ fleet, liked, setLiked }: Props) => {
	const auth = useAuthorization()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	const [showReplyComposer, setShowReplyComposer] = useState(false)

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

	const { mutate } = useMutation(likeHandler, {
		onSuccess: () => {
			queryClient.refetchQueries('fleet-details')
		},
	})

	return (
		<div className='w-full'>
			<div className='flex flex-col pb-2 space-x-1 space-y-2 border-b border-gray-700 cursor-pointer'>
				<div className='flex'>
					<Link href={`/profile/${fleet.author.id}`}>
						<a className='flex items-center justify-center flex-shrink-0 mt-1 mr-2 overflow-hidden border-2 border-transparent rounded-lg w-14 h-14 hover:border-green-500'>
							<img src='http://github.com/RobinMalfait.png' alt='profile-photo' />
						</a>
					</Link>
					<div className='text-base font-bold text-white'>
						<Link href={`/profile/${fleet.author.id}`}>
							<a className='flex flex-col'>
								<span className='text-xl hover:underline'>{fleet.author.displayName}</span>{' '}
								<span className='font-normal text-gray-400'>@{fleet.author.username}</span>
							</a>
						</Link>
					</div>
				</div>
				<div className='text-xl font-normal text-white break-all'>{fleet.body}</div>
				<div className='text-sm font-normal text-gray-400'>
					{format(new Date(fleet.createdAt), 'h:mm bbb • d MMMM, yyyy')}
				</div>
			</div>
			<div className='flex items-center w-full h-8 mt-1 justify-evenly'>
				<div className='flex items-center'>
					<IconButton
						onClick={() => setShowReplyComposer(true)}
						className='text-white transform rounded-full hover:bg-gray-700 hover:text-green-500 hover:scale-110'
					>
						<ReplyIcon className='w-5 h-5' />
					</IconButton>
					<span className='text-lg text-white'>{fleet.replies.length}</span>
				</div>
				<div className='flex items-center'>
					<IconButton
						onClick={mutate}
						className='text-white transform rounded-full hover:bg-gray-700 hover:text-green-500 hover:scale-110'
					>
						{liked ? <HeartFilledIcon className='w-5 h-5' /> : <HeartIcon className='w-5 h-5' />}
					</IconButton>
					<span className='text-lg text-white'>{fleet.likes.length}</span>
				</div>
			</div>
			<ReplyComposer fleet={fleet} visible={showReplyComposer} setVisible={setShowReplyComposer} />
		</div>
	)
}

export default FleetView
