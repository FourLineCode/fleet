import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import Modal from '../ui/Modal'
import UserInfo from './UserInfo'

interface Props {
	visible: boolean
	setVisible: (arg: any) => void
}

type TabTypes = 'followers' | 'following'

const Tabs: Record<TabTypes, TabTypes> = {
	followers: 'followers',
	following: 'following',
}

const FollowDetails = ({ visible, setVisible }: Props) => {
	const [tab, setTab] = useState<TabTypes>(Tabs.followers)
	const user = useCurrentUser()

	useEffect(() => {
		setTab(Tabs.followers)
	}, [visible])

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
			<div className='flex-1 p-4 space-y-2 overflow-y-auto overscroll-contain'>
				{tab === Tabs.followers
					? Array.from({ length: 4 }).map(() => <UserInfo user={user} />)
					: Array.from({ length: 9 }).map(() => <UserInfo user={user} />)}
			</div>
		</Modal>
	)
}

export default FollowDetails
