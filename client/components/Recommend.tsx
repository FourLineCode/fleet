import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import { setError } from '../store/actions/notificationActions'
import { UserState } from '../store/reducers/types'
import { BASE_URL } from '../utils/config'
import UserInfo from './UserInfo'

const Recommend = () => {
	const auth = useAuthorization()
	const dispatch = useDispatch()

	const getRecommendations = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/search/recommend`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})
			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data } = useQuery('recommended-users', getRecommendations)

	return (
		<div className='h-full p-4'>
			<div className='hidden w-full px-4 pt-2 pb-4 border border-gray-700 rounded-lg shadow-xl xl:block'>
				<div className='mb-2 text-lg text-white'>People you may know</div>
				<div className='flex flex-col space-y-4'>
					{data && data.map((user: UserState) => <UserInfo user={user} key={user.id} />)}
				</div>
			</div>
		</div>
	)
}

export default Recommend
