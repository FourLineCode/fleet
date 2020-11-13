import React, { useEffect } from 'react'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { useMutation, useQueryCache } from 'react-query'
import { baseUrl } from '../config'
import ProfileIcon from '../ui/icons/ProfileIcon'
import ReplyIcon from '../ui/icons/ReplyIcon'
import HeartIcon from '../ui/icons/HeartIcon'
import HeartFilledIcon from '../ui/icons/HeartFilledIcon'
import IconButton from '../ui/IconButton'
import useAuthorization from '../hooks/useAuthorization'
import useCurrentUser from '../hooks/useCurrentUser'

const Tweet = ({ tweet }) => {
	const auth = useAuthorization()
	const user = useCurrentUser()
	const queryCache = useQueryCache()

	// TODO: make this cleaner
	const likeHandler = async () => {
		try {
			if (!tweet.likes.includes(user.id)) {
				await axios.post(
					`${baseUrl}/tweet/like/${tweet._id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${auth.token}`,
						},
					}
				)
			} else {
				await axios.post(
					`${baseUrl}/tweet/unlike/${tweet._id}`,
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
			queryCache.refetchQueries('tweets')
		},
	})

	return (
		<div className='w-3/4 px-2 pt-2 mx-auto border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex space-x-1'>
				<div className='flex items-center justify-center flex-shrink-0 w-10 h-10 mt-2 mr-2 text-3xl text-white bg-gray-500 rounded-full'>
					<ProfileIcon className='w-6 h-6 text-green-300' />
				</div>
				<div>
					<div className='text-base font-bold text-white'>
						{tweet.author.displayName}{' '}
						<span className='font-normal text-gray-400'>
							@{tweet.author.username}
						</span>
						{' • '}
						<span className='text-sm font-normal text-gray-400'>
							{formatDistanceToNow(new Date(tweet.createdAt))}
						</span>
					</div>
					<div className='text-sm text-white break-words'>{tweet.body}</div>
				</div>
			</div>
			<div className='flex items-center w-full h-6 justify-evenly'>
				<IconButton className='text-white rounded-full hover:bg-gray-700 hover:text-green-500'>
					<ReplyIcon className='w-4 h-4' />
				</IconButton>
				<div className='flex items-center'>
					<IconButton
						onClick={mutate}
						className='text-white rounded-full hover:bg-gray-700 hover:text-green-500'>
						{tweet.likes.includes(user.id) ? (
							<HeartFilledIcon className='w-4 h-4' />
						) : (
							<HeartIcon className='w-4 h-4' />
						)}
					</IconButton>
					<span className='text-base text-white'>{tweet.likes.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Tweet
