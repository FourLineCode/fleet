import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from './icons/TwitterIcon'

const Navbar = () => {
	return (
		<div className='flex justify-center h-12 bg-gray-800 border-b border-gray-500'>
			<nav className='container flex items-center justify-between'>
				<Link
					to='/'
					className='flex items-center text-2xl italic font-semibold text-center text-white'>
					<TwitterIcon className='w-6 h-6 mr-3 duration-150 transform hover:scale-110' />
					TweetyTweet
				</Link>
				<div className='flex items-center space-x-5 text-center'>
					<Link to='/signup' className='text-xl text-white hover:underline'>
						Sign up
					</Link>
					<div className='h-6 w-0.5 bg-white'></div>
					<Link to='/signin' className='text-xl text-white hover:underline'>
						Sign in
					</Link>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
