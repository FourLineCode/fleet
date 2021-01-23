import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../../hooks/useAuthorization'
import { setError } from '../../store/actions/notificationActions'
import { UserState } from '../../store/reducers/types'
import Modal from '../../ui/components/Modal'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import UserInfo from '../Recommend/UserInfo'

interface Props {
	tabType: TabTypes
	visible: boolean
	setVisible: (arg: any) => void
}

export type TabTypes = 'followers' | 'following'

export const Tabs: Record<TabTypes, TabTypes> = {
	followers: 'followers',
	following: 'following',
}

const FollowDetails = ({ tabType, visible, setVisible }: Props) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { id } = router.query
	const [tab, setTab] = useState<TabTypes>(Tabs.followers)
	const auth = useAuthorization()
	const dispatch = useDispatch()

	const getFollowDetails = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/follow/users/${id}`, auth.apiConfig)

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data, isLoading } = useQuery(queryTypes.FOLLOW_DETAILS, getFollowDetails)

	useEffect(() => {
		setTab(tabType)
		queryClient.prefetchQuery(queryTypes.FOLLOW_DETAILS, getFollowDetails)
	}, [visible])

	useEffect(() => {
		setVisible(false)
		queryClient.removeQueries(queryTypes.FOLLOW_DETAILS)
	}, [id])

	useEffect(() => {
		queryClient.refetchQueries(queryTypes.FOLLOW_DETAILS)

		return () => {
			queryClient.removeQueries(queryTypes.FOLLOW_DETAILS)
		}
	}, [])

	return (
		<Modal
			visible={visible}
			setVisible={setVisible}
			position='center'
			className='flex flex-col bg-gray-800 rounded-lg shadow-lg w-96 h-96'
		>
			<div className='flex w-full font-semibold text-white'>
				<div
					onClick={() => setTab(Tabs.followers)}
					className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-700'
				>
					Followers
					<div
						className={clsx(
							tab === Tabs.followers ? 'block' : 'invisible',
							'absolute bottom-0 left-0 w-full h-1 bg-green-500'
						)}
					/>
				</div>
				<div
					onClick={() => setTab(Tabs.following)}
					className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-700'
				>
					Following
					<div
						className={clsx(
							tab === Tabs.following ? 'block' : 'invisible',
							'absolute bottom-0 left-0 w-full h-1 bg-green-500'
						)}
					/>
				</div>
			</div>
			<div
				className={clsx(
					isLoading && 'flex justify-center items-center',
					'flex-1 p-4 space-y-2 overflow-y-auto overscroll-contain'
				)}
			>
				{tab === Tabs.followers
					? data &&
					  data.followers.map((follower: UserState) => <UserInfo user={follower} key={follower.id} />)
					: data &&
					  data.following.map((followed: UserState) => <UserInfo user={followed} key={followed.id} />)}
				{isLoading && (
					<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
				)}
			</div>
		</Modal>
	)
}

export default FollowDetails
