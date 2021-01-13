import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useAuthorization from '../hooks/useAuthorization'
import FleetIcon from '../ui/icons/FleetIcon'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	const { signedIn } = useAuthorization()
	const { pathname } = useRouter()
	const redirect = signedIn ? '/home' : pathname

	return (
		<div className='flex justify-center w-full bg-gray-800 border-b border-gray-500 h-14'>
			<nav className='flex items-center justify-between w-3/4 mx-4 md:mx-0'>
				<Link href={redirect}>
					<a className='flex items-center text-3xl italic font-bold text-center text-white duration-150 transform hover:scale-105'>
						<FleetIcon className='w-8 h-8 mr-3' />
						Fleet
					</a>
				</Link>
				<div className='flex items-center space-x-5 text-center'>
					{signedIn ? <SignedInLinks /> : <SignedOutLinks />}
				</div>
			</nav>
		</div>
	)
}

export default Navbar
