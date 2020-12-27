import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { queryCache, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import ErrorIcon from '../ui/icons/ErrorIcon'
import Fleet from './Fleet'
import { FleetType } from './Timeline'

interface Params {
	id: string
}

const ProfileTimeline = () => {
	const auth = useAuthorization()
	const { id } = useParams<Params>()

	const getFleets = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/timeline/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			})
			return res.data
		} catch (error) {
			console.log(error)
		}
	}

	const { data, isLoading } = useQuery('profile-fleets', getFleets)

	useEffect(() => {
		queryCache.prefetchQuery('profile-fleets', getFleets)
	}, [id])

	return (
		<>
			<div className='flex justify-center'>
				<div className='w-16 border-b-2 border-green-400'>
					<div className='text-xl font-bold text-center text-white'>Posts</div>
				</div>
			</div>
			<div className={clsx(isLoading && 'justify-center', 'h-full my-4 flex-col space-y-4')}>
				{!isLoading && data && data.length > 0 ? (
					data && data.map((fleet: FleetType) => <Fleet fleet={fleet} key={fleet._id} />)
				) : (
					<div className='flex items-center justify-center w-full h-full'>
						<div className='flex-col'>
							<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
							<div className='text-2xl font-semibold text-gray-500'>No Fleets found</div>
						</div>
					</div>
				)}
				{isLoading && (
					<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
				)}
			</div>
		</>
	)
}

export default ProfileTimeline
