import { CircularProgress } from '@material-ui/core'
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
	// TODO: clean this shit up
	const [followData, setFollowData] = useState<Record<string, Object[] | number>>({
		folowers: [],
		followerCount: 0,
		following: [],
		followingCount: 0,
	})
	const [followed, setFollowed] = useState(false)
	const [disableFollow, setDisableFollow] = useState(false)
	const [showFollowDetails, setShowFollowDetails] = useState(false)
	const [tab, setTab] = useState<TabTypes>(Tabs.followers)

	const getUserData = async () => {
		if (!id) return
		try {
			setUserDataLoading(true)
			const res = await axios.get(`${BASE_URL}/user/info/${id}`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})
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
			const res = await axios.get(`${BASE_URL}/follow/count/${id}`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})

			const { followers, following } = res.data

			const followResponse = {
				followers: followers,
				followerCount: followers.length,
				following: following,
				followingCount: following.length,
			}

			return followResponse
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const handleFollow = async () => {
		try {
			if (!followed) {
				const res = await axios.post(
					`${BASE_URL}/follow/${id}`,
					{},
					{
						headers: {
							authorization: `Bearer ${auth.token}`,
						},
					}
				)

				return res.data
			} else {
				const res = await axios.post(
					`${BASE_URL}/follow/unfollow/${id}`,
					{},
					{
						headers: {
							authorization: `Bearer ${auth.token}`,
						},
					}
				)

				return res.data
			}
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const followDetailsHandler = (tabType: TabTypes) => {
		setTab(tabType)
		setShowFollowDetails(true)
	}

	const checkFollow = async () => {
		if (!id) return { follows: false }
		try {
			const res = await axios.get(`${BASE_URL}/follow/check/${id}`, {
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			})

			return res.data
		} catch (error) {
			if (error.response) dispatch(setError(error.response.data.message))
		}
	}

	const { data } = useQuery('follow-data', getFollowData)

	useQuery('is-following', checkFollow, {
		onSuccess: (isFollowingData) => {
			setFollowed(isFollowingData.follows)
		},
	})

	const { mutate } = useMutation(handleFollow, {
		onSuccess: (data) => {
			if (followed) setFollowed(!data.success)
			else setFollowed(data.success)
			queryClient.refetchQueries('follow-data')
		},
	})

	useEffect(() => {
		if (data) {
			setFollowData(data)
		}
	}, [data])

	useEffect(() => {
		getUserData()
		queryClient.prefetchQuery('follow-data', getFollowData)
	}, [id])

	useEffect(() => {
		if (id === auth.id) {
			setDisableFollow(true)
			return
		}
		setDisableFollow(false)

		queryClient.prefetchQuery('is-following', checkFollow)
	}, [id])

	return (
		<div
			className={clsx(
				(userDataLoading || !userData) && 'flex justify-center items-center',
				'w-full h-full col-span-4 md:col-span-3 xl:col-span-2 md:border-l lg:border-r border-gray-500'
			)}
		>
			{userData && !userDataLoading && (
				<>
					<Head>
						<title>{userData.displayName} | Fleet</title>
					</Head>
					<ProfileBanner isAdmin={userData.isAdmin} />
					<div className='px-4'>
						<div className='flex items-center justify-between pb-2 text-2xl text-white'>
							<div className='flex flex-col'>
								<span className='flex items-center text-white'>
									<span className='text-3xl font-semibold '>{userData?.displayName}</span>
									{userData.isAdmin && <VerifiedFilledIcon className='w-6 h-6 ml-1 text-white' />}
								</span>
								<span className='text-lg text-gray-400'>@{userData?.username}</span>
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
						<div className='flex items-center pb-2 space-x-4 text-gray-400 border-b border-gray-500'>
							<div className='cursor-pointer' onClick={() => followDetailsHandler(Tabs.followers)}>
								<span className='text-lg font-bold text-white'>{followData.followerCount}</span>{' '}
								Followers
							</div>
							<div className='cursor-pointer' onClick={() => followDetailsHandler(Tabs.following)}>
								<span className='text-lg font-bold text-white'>{followData.followingCount}</span>{' '}
								Following
							</div>
						</div>
						<ProfileInfo bio={userData.bio} createdAt={userData.createdAt} />
						<ProfileTimeline />
					</div>
					<FollowDetails tabType={tab} visible={showFollowDetails} setVisible={setShowFollowDetails} />
				</>
			)}
			{userDataLoading && (
				<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
			)}
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