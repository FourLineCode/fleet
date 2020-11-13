import React, { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import clsx from 'clsx'
import { CircularProgress } from '@material-ui/core'
import { baseUrl } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import Tweet from './Tweet'

const Timeline = () => {
	const auth = useAuthorization()

	const getTweets = async () => {
		try {
			const res = await axios.get(`${baseUrl}/tweet`, {
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
			) : (
				data && data.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
			)}
		</div>
	)
}

export default Timeline
