import React from 'react'
import { Link } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'
import TwitterIcon from '../ui/icons/TwitterIcon'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	const { signedIn } = useAuthorization()

	return (
		<div className='flex justify-center w-full h-12 bg-gray-800 border-b border-gray-500'>
			<nav className='flex items-center justify-between w-3/4 mx-4 md:mx-0'>
				<Link
					to='/home'
					className='flex items-center text-2xl italic font-bold text-center text-white duration-150 transform hover:scale-105'>
					<TwitterIcon className='w-6 h-6 mr-3' />
					TweetyTweet
				</Link>
				<div className='flex items-center space-x-5 text-center'>
					{signedIn ? <SignedInLinks /> : <SignedOutLinks />}
				</div>
			</nav>
		</div>
	)
}

export default Navbar
