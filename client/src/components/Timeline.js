import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import clsx from 'clsx'
import { CircularProgress } from '@material-ui/core'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import Tweet from './Tweet'
import ErrorIcon from '../ui/icons/ErrorIcon'

const Timeline = () => {
	const auth = useAuthorization()

	const getTweets = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/tweet`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			})

			return res.data
		} catch (error) {
			console.log(error)
		}
	}

	// TODO: Handle error with error component
	const { data, isLoading } = useQuery('tweets', getTweets)

	return (
		<div
			className={clsx(
				'h-full col-span-2 border-l border-r border-gray-500 py-4',
				isLoading ? 'flex items-center justify-center' : 'flex-col space-y-4'
			)}>
			{isLoading ? (
				<CircularProgress
					color='primary'
					variant='indeterminate'
					disableShrink
					size={30}
					thickness={4}
				/>
			) : data && data.length > 0 ? (
				data && data.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
			) : (
				<div className='flex items-center justify-center w-full h-full'>
					<div className='flex-col'>
						<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
						<div className='text-2xl font-semibold text-gray-500'>
							No Tweets found
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Timeline
