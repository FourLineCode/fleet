import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
	return (
		<>
			<Link to='/signup' className='text-xl text-white hover:underline'>
				Sign up
			</Link>
			<div className='h-6 w-0.5 bg-white'></div>
			<Link to='/signin' className='text-xl text-white hover:underline'>
				Sign in
			</Link>
		</>
	)
}

export default SignedOutLinks
