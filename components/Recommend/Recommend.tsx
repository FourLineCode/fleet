import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError } from '../../store/actions/notificationActions'
import { UserState } from '../../store/reducers/types'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import UserInfo from './UserInfo'

const Recommend = () => {
	const queryClient = useQueryClient()
	const dispatch = useDispatch()

	const getRecommendations = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/search/recommend`)
			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data } = useQuery(queryTypes.RECOMMENDED_USERS, getRecommendations)

	useEffect(() => {
		return () => {
			queryClient.removeQueries(queryTypes.RECOMMENDED_USERS)
		}
	}, [])

	return (
		<div className='h-full p-4'>
			<div className='hidden w-full px-4 pt-2 pb-4 border border-gray-700 rounded-lg shadow-xl xl:block'>
				<div className='mb-2 text-lg text-white'>People you may know</div>
				<div className='flex flex-col space-y-4'>
					{data && data.length > 0 && data.map((user: UserState) => <UserInfo user={user} key={user.id} />)}
				</div>
			</div>
		</div>
	)
}

export default Recommend
