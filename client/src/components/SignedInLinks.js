import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../store/actions/authActions'

const SignedInLinks = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const signoutHandler = (e) => {
		e.preventDefault()

		dispatch(signout())
	}

	return (
		<>
			<div className='px-4 py-2 mx-1 text-white bg-green-500 rounded'>
				{user.id}
			</div>
			<div className='px-4 py-2 mx-1 text-white bg-green-500 rounded'>
				{user.username}
			</div>
			<div className='px-4 py-2 mx-1 text-white bg-green-500 rounded'>
				{user.displayName}
			</div>
			<div className='h-6 w-0.5 bg-white'></div>
			<a
				onClick={signoutHandler}
				href='#'
				className='text-xl text-white hover:underline'>
				Sign out
			</a>
		</>
	)
}

export default SignedInLinks
