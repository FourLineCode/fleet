import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import axios from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { setError } from '../../store/actions/notificationActions'
import { UserState } from '../../store/reducers/types'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import UserInfo from '../Recommend/UserInfo'
import RecommendSuspense from '../Suspense/RecommendSuspense'

interface Props {
	tabType: TabTypes
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export type TabTypes = 'followers' | 'following'

export const Tabs: Record<TabTypes, TabTypes> = {
	followers: 'followers',
	following: 'following',
}

const FollowDetails = ({ tabType, isOpen, onOpen, onClose }: Props) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const { id } = router.query
	const [tab, setTab] = useState<TabTypes>(Tabs.followers)

	const getFollowDetails = async () => {
		try {
			const res = await axios.get(`${BASE_URL}/follow/users/${id}`)

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data, isLoading } = useQuery(queryTypes.FOLLOW_DETAILS, getFollowDetails)

	useEffect(() => {
		if (isOpen) {
			setTab(tabType)
			queryClient.prefetchQuery(queryTypes.FOLLOW_DETAILS, getFollowDetails)
		}
	}, [isOpen])

	useEffect(() => {
		onClose()
		queryClient.removeQueries(queryTypes.FOLLOW_DETAILS)
	}, [id])

	useEffect(() => {
		queryClient.refetchQueries(queryTypes.FOLLOW_DETAILS)

		return () => {
			queryClient.removeQueries(queryTypes.FOLLOW_DETAILS)
		}
	}, [])

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='md' isCentered scrollBehavior='inside'>
			<ModalOverlay />
			<ModalContent>
				<div className='flex flex-col w-full rounded-sm shadow-lg bg-light dark:bg-dark-800 h-96'>
					<div className='flex w-full font-semibold text-black dark:text-white'>
						<div
							onClick={() => setTab(Tabs.followers)}
							className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-700'
						>
							Followers
							<div
								className={clsx(
									tab === Tabs.followers ? 'block' : 'invisible',
									'absolute bottom-0 left-0 w-full h-1 bg-brand-500'
								)}
							/>
						</div>
						<div
							onClick={() => setTab(Tabs.following)}
							className='relative flex items-center justify-center flex-1 h-10 cursor-pointer hover:bg-gray-300 dark:hover:bg-dark-700'
						>
							Following
							<div
								className={clsx(
									tab === Tabs.following ? 'block' : 'invisible',
									'absolute bottom-0 left-0 w-full h-1 bg-brand-500'
								)}
							/>
						</div>
					</div>
					<div className={clsx('flex-1 p-4 space-y-2 overflow-y-auto overscroll-contain')}>
						{tab === Tabs.followers
							? data &&
							  data.followers.map((follower: UserState) => (
									<UserInfo user={follower} key={follower.id} />
							  ))
							: data &&
							  data.following.map((followed: UserState) => (
									<UserInfo user={followed} key={followed.id} />
							  ))}
						{isLoading && <RecommendSuspense />}
					</div>
				</div>
			</ModalContent>
		</Modal>
	)
}

export default FollowDetails
