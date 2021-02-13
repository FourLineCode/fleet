import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import clsx from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useAuthorization from '../../hooks/useAuthorization'
import { setError } from '../../store/actions/notificationActions'
import { UserState } from '../../store/reducers/types'
import Button from '../../ui/components/Button'
import ErrorIcon from '../../ui/icons/ErrorIcon'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'
import { BASE_URL } from '../../utils/config'
import { queryTypes } from '../../utils/query'
import ProfileSuspense from '../Suspense/ProfileSuspense'
import FollowDetails, { Tabs, TabTypes } from './FollowDetails'
import ProfileBanner from './ProfileBanner'
import ProfileInfo from './ProfileInfo'
import ProfileTimeline from './ProfileTimeline'

const ProfileCard = () => {
	const router = useRouter()
	const { id } = router.query
	const auth = useAuthorization()
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const [userData, setUserData] = useState<UserState>()
	const [userDataLoading, setUserDataLoading] = useState(false)
	const [followData, setFollowData] = useState<Record<string, number>>({
		followerCount: 0,
		followingCount: 0,
	})
	const [followed, setFollowed] = useState(false)
	const [disableFollow, setDisableFollow] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [tab, setTab] = useState<TabTypes>(Tabs.followers)

	const getUserData = async () => {
		if (!id) return
		try {
			setUserDataLoading(true)
			const res = await axios.get(`${BASE_URL}/user/info/${id}`)
			setUserData(res.data)
			setUserDataLoading(false)
			return
		} catch (error) {
			setUserDataLoading(false)
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const getFollowData = async () => {
		if (!id) return
		try {
			const res = await axios.get(`${BASE_URL}/follow/count/${id}`)

			const { followerCount, followingCount } = res.data

			const followResponse = {
				followerCount,
				followingCount,
			}

			return followResponse
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const handleFollow = async () => {
		try {
			if (!followed) {
				const res = await axios.post(`${BASE_URL}/follow/${id}`)

				return res.data
			} else {
				const res = await axios.post(`${BASE_URL}/follow/unfollow/${id}`)

				return res.data
			}
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const followDetailsHandler = (tabType: TabTypes) => {
		setTab(tabType)
		onOpen()
	}

	const checkFollow = async () => {
		if (!id) return { follows: false }
		try {
			const res = await axios.get(`${BASE_URL}/follow/check/${id}`)

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data } = useQuery(queryTypes.FOLLOW_DATA, getFollowData)

	useQuery(queryTypes.IS_FOLLOWING, checkFollow, {
		onSuccess: (isFollowingData) => {
			if (isFollowingData) {
				setFollowed(isFollowingData.follows)
			}
		},
	})

	const { mutate } = useMutation(handleFollow, {
		onMutate: () => {
			setFollowed(!followed)
		},
		onSettled: () => {
			queryClient.invalidateQueries(queryTypes.FOLLOW_DATA)
			queryClient.invalidateQueries(queryTypes.IS_FOLLOWING)
		},
	})

	useEffect(() => {
		if (data) {
			setFollowData(data)
		}
	}, [data])

	useEffect(() => {
		getUserData()
		queryClient.prefetchQuery(queryTypes.FOLLOW_DATA, getFollowData)
	}, [id])

	useEffect(() => {
		if (id === auth.id) {
			setDisableFollow(true)
			return
		}
		setDisableFollow(false)

		queryClient.prefetchQuery(queryTypes.IS_FOLLOWING, checkFollow)
	}, [id])

	return (
		<div
			className={clsx(
				(userDataLoading || !userData) && 'flex justify-center items-center',
				'w-full h-full col-span-4 md:col-span-3 xl:col-span-2 md:border-l lg:border-r border-dark-500'
			)}
		>
			{userData && !userDataLoading && (
				<>
					<Head>
						<title>{userData.displayName} | Fleet</title>
					</Head>
					<ProfileBanner isAdmin={userData.isAdmin} />
					<div className='px-2'>
						<div className='flex items-center justify-between pb-2 text-2xl text-black dark:text-white'>
							<div className='flex flex-col'>
								<span className='flex items-center'>
									<span className='text-3xl font-bold '>{userData?.displayName}</span>
									{userData.isAdmin && (
										<VerifiedFilledIcon className='w-6 h-6 ml-1 text-brand-500 dark:text-white' />
									)}
								</span>
								<span className='text-lg text-gray-600 dark:text-gray-400'>@{userData?.username}</span>
							</div>
							<Button
								type='button'
								variant={followed ? 'filled' : 'outlined'}
								disabled={disableFollow}
								onClick={mutate}
								className={clsx('text-base', disableFollow && 'hidden')}
							>
								{followed ? 'Unfollow' : 'Follow'}
							</Button>
						</div>
						<div className='flex items-center pb-2 space-x-4 text-gray-600 border-b dark:text-gray-400 border-dark-500'>
							<div className='cursor-pointer' onClick={() => followDetailsHandler(Tabs.followers)}>
								<span className='text-lg font-bold text-black dark:text-white'>
									{followData.followerCount}
								</span>{' '}
								Followers
							</div>
							<div className='cursor-pointer' onClick={() => followDetailsHandler(Tabs.following)}>
								<span className='text-lg font-bold text-black dark:text-white'>
									{followData.followingCount}
								</span>{' '}
								Following
							</div>
						</div>
						<ProfileInfo bio={userData.bio} createdAt={userData.createdAt} />
						<ProfileTimeline />
					</div>
					<FollowDetails tabType={tab} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
				</>
			)}
			{userDataLoading && <ProfileSuspense />}
			{!userData && !userDataLoading && (
				<div className='flex items-center justify-center w-full h-full'>
					<div className='flex-col'>
						<ErrorIcon className='w-20 h-20 mx-auto text-gray-500' />
						<div className='text-2xl font-semibold text-gray-500'>User not found</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProfileCard
