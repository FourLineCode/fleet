import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useCurrentUser from '../../hooks/useCurrentUser'
import { signout } from '../../store/actions/authActions'
import VerifiedFilledIcon from '../../ui/icons/VerifiedFilledIcon'

const SignedInLinks = () => {
	const user = useCurrentUser()
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	const signoutHandler = (e: React.MouseEvent) => {
		e.preventDefault()

		queryClient.clear()
		dispatch(signout())
	}

	return (
		<div className='flex items-center space-x-4'>
			<div className='relative'>
				<Menu>
					{({ open }) => (
						<>
							<Menu.Button className='focus:outline-none'>
								<div
									className={clsx(
										user.isAdmin ? 'border-yellow-400' : 'border-white hover:border-green-400',
										'inline-flex items-center w-12 h-12 overflow-hidden border-2 border-white rounded-lg'
									)}
								>
									<img
										src={
											user.isAdmin
												? 'https://github.com/FourLineCode.png'
												: 'https://github.com/RobinMalfait.png'
										}
										alt='user-logo'
									/>
								</div>
							</Menu.Button>
							<Transition
								show={open}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items
									static
									className='absolute right-0 z-50 w-48 p-2 mt-1 space-y-1 text-white bg-gray-800 border-2 border-green-500 rounded-lg shadow-lg top-full focus:outline-none'
								>
									<div className='px-4 py-2 text-left border-b border-gray-700'>
										<p className='text-xs text-gray-500'>Signed in as</p>
										<p className='flex items-center'>
											{user.displayName}
											<span>
												{user.isAdmin && <VerifiedFilledIcon className='w-4 h-4 ml-1' />}
											</span>
										</p>
										<p className='text-gray-400'>@{user.username}</p>
									</div>
									<Menu.Item>
										<Link href={`/profile/${user.id}`}>
											<a className='flex w-full px-4 py-2 font-semibold rounded-lg outline-none cursor-pointer hover:bg-green-500 hover:bg-opacity-25 hover:text-green-500'>
												Profile
											</a>
										</Link>
									</Menu.Item>
									<Menu.Item disabled>
										<a className='flex w-full px-4 py-2 font-semibold rounded-lg outline-none cursor-pointer hover:bg-green-500 hover:bg-opacity-25 hover:text-green-500'>
											Settings (soon)
										</a>
									</Menu.Item>
									<Menu.Item>
										<div
											onClick={signoutHandler}
											className='flex w-full px-4 py-2 font-semibold rounded-lg outline-none cursor-pointer hover:bg-green-500 hover:bg-opacity-25 hover:text-green-500'
										>
											Sign Out
										</div>
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</>
					)}
				</Menu>
			</div>
		</div>
	)
}

export default SignedInLinks
