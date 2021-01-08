import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import { UserState } from '../store/reducers/types'
import UserInfo from './UserInfo'

const Recommend = () => {
	const auth = useAuthorization()

	const getRecommendations = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/search/recommend`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})
			return res.data
		} catch (error) {
			console.log(error.response.data)
		}
	}

	const { data } = useQuery('recommended-users', getRecommendations)

	return (
		<div className='h-full p-4'>
			<div className='w-full px-4 pt-2 pb-4 border border-gray-700 rounded-lg shadow-xl'>
				<div className='mb-2 text-lg text-white'>People you may know</div>
				<div className='flex flex-col space-y-4'>
					{data && data.map((user: UserState) => <UserInfo user={user} key={user.id} />)}
				</div>
			</div>
		</div>
	)
}

export default Recommend
