import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError } from '../../store/actions/notificationActions'
import ErrorIcon from '../../ui/icons/ErrorIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import TimelineSuspense from '../Suspense/TimelineSuspense'
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
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	const getFleets = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/home`)

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
		<div className='flex flex-col h-full col-span-4 px-1 py-4 mb-8 space-y-4 border-dark-500 md:px-2 lg:px-0 md:col-span-3 xl:col-span-2 md:border-l xl:border-r md:mb-0'>
			{isLoading ? (
				<TimelineSuspense />
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
