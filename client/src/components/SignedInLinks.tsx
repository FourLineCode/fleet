import React from 'react'
import { useDispatch } from 'react-redux'
import useCurrentUser from '../hooks/useCurrentUser'
import { signout } from '../store/actions/authActions'
import Button from '../ui/Button'
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
			<div className='flex items-center px-4 mx-1 text-right'>
				<div className='flex flex-col'>
					<span className='text-gray-300'>{user.displayName}</span>
					<span className='text-gray-400'>@{user.username}</span>
				</div>
				<ProfileIcon className='w-12 h-12 ml-2 text-gray-400' />
			</div>
			<div className='h-6 w-0.5 bg-white'></div>
			<a onClick={signoutHandler} href='#'>
				<Button variant='filled' type='button'>
					Sign out
				</Button>
			</a>
		</>
	)
}

export default SignedInLinks
