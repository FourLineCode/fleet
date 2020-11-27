import React from 'react'
import { Link } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'
import FleetIcon from '../ui/icons/FleetIcon'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	const { signedIn } = useAuthorization()

	return (
		<div className='flex justify-center w-full bg-gray-800 border-b border-gray-500 h-14'>
			<nav className='flex items-center justify-between w-3/4 mx-4 md:mx-0'>
				<Link
					to='/home'
					className='flex items-center text-3xl italic font-bold text-center text-white duration-150 transform hover:scale-105'>
					<FleetIcon className='w-8 h-8 mr-3' />
					Fleet
				</Link>
				<div className='flex items-center space-x-5 text-center'>
					{signedIn ? <SignedInLinks /> : <SignedOutLinks />}
				</div>
			</nav>
		</div>
	)
}

export default Navbar
