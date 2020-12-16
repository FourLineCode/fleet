import React from 'react'
import { queryCache } from 'react-query'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import { signout } from '../store/actions/authActions'
import Button from '../ui/Button'

const SignedInLinks = () => {
	const user = useCurrentUser()
	const dispatch = useDispatch()

	const signoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		queryCache.clear()
		dispatch(signout())
	}

	return (
		<>
			<div className='flex items-center px-4 mx-1 space-x-2 text-right'>
				<div className='flex flex-col'>
					<span className='text-gray-300'>{user.displayName}</span>
					<span className='text-gray-400'>@{user.username}</span>
				</div>
				<Link to={`/profile/${user.id}`}>
					<div className='w-12 h-12 overflow-hidden border-2 border-green-500 rounded-full hover:border-green-400'>
						<img src='http://github.com/kesne.png' />
					</div>
				</Link>
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
