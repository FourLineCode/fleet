import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { queryCache, useQuery } from 'react-query'
import { BASE_URL } from '../config'
import useAuthorization from '../hooks/useAuthorization'
import { UserState } from '../store/reducers/types'
import Modal from '../ui/Modal'
import UserInfo from './UserInfo'

interface Props {
	id: string
	tabType: TabTypes
	visible: boolean
	setVisible: (arg: any) => void
}

export type TabTypes = 'followers' | 'following'

export const Tabs: Record<TabTypes, TabTypes> = {
	followers: 'followers',
	following: 'following',
}

const FollowDetails = ({ id, tabType, visible, setVisible }: Props) => {
	const [tab, setTab] = useState<TabTypes>(Tabs.followers)
	const auth = useAuthorization()

	const getFollowDetails = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/follow/users/${id}`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})

			return res.data
		} catch (error) {
			console.log(error)
		}
	}

	const { data, isLoading } = useQuery('follow-details', getFollowDetails)

	useEffect(() => {
		setTab(tabType)
		queryCache.prefetchQuery('follow-details', getFollowDetails)
	}, [visible])

	useEffect(() => {
		queryCache.refetchQueries('follow-details')
	}, [])

	useEffect(() => {
		setVisible(false)
		queryCache.removeQueries('follow-details')
	}, [id])

	return (
		<Modal
			visible={visible}
			setVisible={setVisible}
			position='center'
			className='flex flex-col w-full bg-gray-800 rounded-lg shadow-lg md:w-1/5 h-96'>
			<div className='flex w-full font-semibold text-white'>
				<div
					onClick={() => setTab(Tabs.followers)}
					className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-700'>
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
					className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-700'>
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
				)}>
				{tab === Tabs.followers
					? data && data.followers.map((follower: UserState) => <UserInfo user={follower} />)
					: data && data.following.map((followed: UserState) => <UserInfo user={followed} />)}
				{isLoading && (
					<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
				)}
			</div>
		</Modal>
	)
}

export default FollowDetails
