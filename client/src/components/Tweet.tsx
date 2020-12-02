import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { useMutation, useQueryCache } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import useCurrentUser from '../hooks/useCurrentUser'
import IconButton from '../ui/IconButton'
import HeartFilledIcon from '../ui/icons/HeartFilledIcon'
import HeartIcon from '../ui/icons/HeartIcon'
import ReplyIcon from '../ui/icons/ReplyIcon'
import { TweetType } from './Timeline'

type Props = {
	tweet: TweetType
}

const Tweet = ({ tweet }: Props) => {
	const auth = useAuthorization()
	const user = useCurrentUser()
	const queryCache = useQueryCache()
	const location = useLocation()

	// TODO: make this cleaner
	const likeHandler = async () => {
		try {
			if (!tweet.likes.includes(user.id!)) {
				await axios.post(
					`${BASE_URL}/tweet/like/${tweet._id}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${auth.token}`,
						},
					}
				)
			} else {
				await axios.post(
					`${BASE_URL}/tweet/unlike/${tweet._id}`,
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
			if (location.pathname.startsWith('/home')) {
				queryCache.refetchQueries('tweets')
			} else if (location.pathname.startsWith('/profile')) {
				queryCache.refetchQueries('profile-tweets')
			}
		},
	})

	return (
		<div className='w-3/4 px-2 pt-2 mx-auto border border-gray-700 rounded-lg shadow-xl'>
			<div className='flex space-x-1'>
				<Link to={`/profile/${tweet.author._id}`}>
					<div className='flex items-center justify-center flex-shrink-0 w-10 h-10 mt-2 mr-2 overflow-hidden rounded-full'>
						<img src='http://github.com/kesne.png' />
					</div>
				</Link>
				<div>
					<Link to={`profile/${tweet.author._id}`}>
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
					</Link>
					<div className='text-sm text-white break-all'>
						{tweet.body}
					</div>
				</div>
			</div>
			<div className='flex items-center w-full h-6 justify-evenly'>
				<IconButton
					onClick={() => {}}
					className='text-white rounded-full hover:bg-gray-700 hover:text-green-500'>
					<ReplyIcon className='w-4 h-4' />
				</IconButton>
				<div className='flex items-center'>
					<IconButton
						onClick={mutate}
						className='text-white rounded-full hover:bg-gray-700 hover:text-green-500'>
						{tweet.likes.includes(user.id!) ? (
							<HeartFilledIcon className='w-4 h-4' />
						) : (
							<HeartIcon className='w-4 h-4' />
						)}
					</IconButton>
					<span className='text-base text-white'>
						{tweet.likes.length}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Tweet
