import React from 'react'
import { useDispatch } from 'react-redux'
import useCurrentUser from '../hooks/useCurrentUser'
import { signout } from '../store/actions/authActions'
import ProfileIcon from '../ui/icons/ProfileIcon'

const SignedInLinks = () => {
	const user = useCurrentUser()
	const dispatch = useDispatch()

	const signoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		dispatch(signout())
	}

	return (
		<>
			<div className='flex items-center px-4 mx-1 text-right text-gray-400'>
				<div className='flex flex-col'>
					<span>{user.displayName}</span>
					<span>@{user.username}</span>
				</div>
				<ProfileIcon className='w-10 h-10 ml-2 text-gray-400' />
			</div>
			<div className='h-6 w-0.5 bg-white'></div>
			<a
				onClick={signoutHandler}
				href='#'
				className='text-xl text-white transition duration-150 hover:underline hover:text-green-400'>
				Sign out
			</a>
		</>
	)
}

export default SignedInLinks
