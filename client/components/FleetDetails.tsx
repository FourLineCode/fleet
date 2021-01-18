import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../hooks/useAuthorization'
import { setError } from '../store/actions/notificationActions'
import { UserState } from '../store/reducers/types'
import { BASE_URL } from '../utils/config'
import FleetView from './FleetView'
import Reply from './Reply'

export interface ReplyType {
	id: string
	user: UserState
	body: string
	createdAt: string
}

const FleetDetails = () => {
	const router = useRouter()
	const { id } = router.query
	const auth = useAuthorization()
	const dispatch = useDispatch()
	const [liked, setLiked] = useState<boolean | null>(null)

	const getFleetData = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/fleet/post/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			})

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const checkLiked = async () => {
		const res = await axios.get(`${BASE_URL}/fleet/checklike/${id}`, {
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		})

		setLiked(res.data.liked)
	}

	const { data } = useQuery('fleet-details', getFleetData)

	useEffect(() => {
		checkLiked()
	}, [])

	return (
		<div className='w-full h-full col-span-4 p-2 border-gray-500 md:col-span-3 xl:col-span-2 md:border-l lg:border-r'>
			{data && (
				<div>
					<div className='border-b border-gray-700'>
						<FleetView fleet={data} liked={liked} setLiked={setLiked} />
					</div>
					<div className='w-full mt-6 space-y-4'>
						{data.replies.map((reply: ReplyType) => (
							<Reply reply={reply} user={data.author} key={reply.id} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default FleetDetails
