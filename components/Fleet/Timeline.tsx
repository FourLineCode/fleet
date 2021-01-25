import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../../hooks/useAuthorization'
import { setError } from '../../store/actions/notificationActions'
import ErrorIcon from '../../ui/icons/ErrorIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import Fleet from './Fleet'

interface Author {
	id: string
	username: string
	displayName: string
	isAdmin: boolean
}

interface Like {
	id: string
	createdAt: string
}

interface Reply {
	id: string
	createdAt: string
}
export interface FleetType {
	id: string
	body: string
	createdAt: string
	author: Author
	likes: Like[]
	replies: Reply[]
	liked: boolean
}

const Timeline = () => {
	const auth = useAuthorization()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	const getFleets = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/home`, auth.apiConfig)

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	// TODO: Handle error with error component
	const { data, isLoading } = useQuery(queryTypes.FLEETS, getFleets)

	useEffect(() => {
		return () => {
			queryClient.removeQueries(queryTypes.FLEETS)
		}
	}, [])

	return (
		<div
			className={clsx(
				'h-full col-span-4 px-1 md:px-2 lg:px-0 md:col-span-3 xl:col-span-2 md:border-l lg:border-r mb-8 md:mb-0 border-gray-500 py-4',
				isLoading ? 'flex items-center justify-center' : 'flex-col space-y-4'
			)}
		>
			{isLoading ? (
				<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
			) : data && data.length > 0 ? (
				data.map((fleet: FleetType) => <Fleet fleet={fleet} key={fleet.id} />)
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
