import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { queryCache } from 'react-query'
import { useDispatch } from 'react-redux'
import useCurrentUser from '../hooks/useCurrentUser'
import { signout } from '../store/actions/authActions'
import Button from '../ui/Button'

const SignedInLinks = () => {
	const user = useCurrentUser()
	const router = useRouter()
	const dispatch = useDispatch()

	const signoutHandler = (e: React.MouseEvent) => {
		e.preventDefault()

		queryCache.clear()
		dispatch(signout())
		router.push('/signin')
	}

	return (
		<>
			<div className='flex items-center px-4 mx-1 space-x-2 text-right'>
				<div className='flex flex-col'>
					<span className='text-gray-300'>{user.displayName}</span>
					<span className='text-gray-400'>@{user.username}</span>
				</div>
				<Link href={`/profile/${user.id}`}>
					<a className='w-12 h-12 overflow-hidden border-2 border-green-500 rounded-full hover:border-green-400'>
						<img src='http://github.com/kesne.png' alt='user-logo' />
					</a>
				</Link>
			</div>
			<div className='h-6 w-0.5 bg-white'></div>
			<Button onClick={signoutHandler} variant='filled' type='button'>
				Sign out
			</Button>
		</>
	)
}

export default SignedInLinks
