import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
	return (
		<>
			<Link
				to='/signup'
				className='text-xl text-white transition duration-150 hover:underline hover:text-green-400'>
				Sign up
			</Link>
			<div className='h-6 w-0.5 bg-white'></div>
			<Link
				to='/signin'
				className='text-xl text-white transition duration-150 hover:underline hover:text-green-400'>
				Sign in
			</Link>
		</>
	)
}

export default SignedOutLinks
