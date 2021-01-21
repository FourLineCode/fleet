import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import { setError } from '../store/actions/notificationActions'
import ErrorIcon from '../ui/icons/ErrorIcon'
import { BASE_URL } from '../utils/config'
import Fleet from './Fleet'
import { FleetType } from './Timeline'

const ProfileTimeline = () => {
	const auth = useAuthorization()
	const router = useRouter()
	const { id } = router.query
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	const getFleets = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/timeline/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			})
			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data, isLoading } = useQuery('profile-fleets', getFleets)

	useEffect(() => {
		queryClient.prefetchQuery('profile-fleets', getFleets)
	}, [id])

	useEffect(() => {
		return () => {
			queryClient.removeQueries('profile-fleets')
		}
	}, [])

	return (
		<>
			<div className='flex justify-center'>
				<div className='w-16 border-b-2 border-green-400'>
					<div className='text-xl font-bold text-center text-white'>Posts</div>
				</div>
			</div>
			<div
				className={clsx(
					isLoading && 'justify-center items-center flex',
					'flex h-full my-4 mb-8 md:mb-0 flex-col space-y-4 pb-2'
				)}
			>
				{!isLoading &&
					(data && data.length > 0 ? (
						data.map((fleet: FleetType) => <Fleet fleet={fleet} key={fleet.id} />)
					) : (
						<div className='flex items-center justify-center w-full h-full'>
							<div className='flex-col'>
								<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
								<div className='text-2xl font-semibold text-gray-500'>No Fleets found</div>
							</div>
						</div>
					))}
				{isLoading && (
					<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
				)}
			</div>
		</>
	)
}

export default ProfileTimeline
