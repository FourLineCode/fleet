import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx'
import React from 'react'
import { useQuery } from 'react-query'
import useAuthorization from '../hooks/useAuthorization'
import ErrorIcon from '../ui/icons/ErrorIcon'
import { BASE_URL } from '../utils/config'
import Fleet from './Fleet'

interface Author {
	id: string
	username: string
	displayName: string
	isAdmin: boolean
}

export interface FleetType {
	id: string
	body: string
	createdAt: string
	author: Author
	likes: number
	likers: string[]
}

const Timeline = () => {
	const auth = useAuthorization()

	const getFleets = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/home`, {
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
	const { data, isLoading } = useQuery('fleets', getFleets)

	return (
		<div
			className={clsx(
				'h-full col-span-4 px-1 md:px-2 lg:px-0 md:col-span-3 xl:col-span-2 border-l lg:border-r border-gray-500 py-4',
				isLoading ? 'flex items-center justify-center' : 'flex-col space-y-4'
			)}
		>
			{isLoading ? (
				<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
			) : data && data.length > 0 ? (
				data && data.map((fleet: FleetType) => <Fleet fleet={fleet} key={fleet.id} />)
			) : (
				<div className='flex items-center justify-center w-full h-full'>
					<div className='flex-col'>
						<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
						<div className='text-2xl font-semibold text-gray-500'>No Fleets found</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Timeline
