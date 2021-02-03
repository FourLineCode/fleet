import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useAuthorization from '../../hooks/useAuthorization'
import FleetIcon from '../../ui/icons/FleetIcon'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	const { signedIn } = useAuthorization()
	const { pathname } = useRouter()
	const redirect = signedIn ? '/home' : pathname

	return (
		<div className='sticky top-0 left-0 z-40 flex justify-center w-full border-b border-dark-500 bg-dark-800 h-14'>
			<nav className='flex items-center justify-between w-full mx-4 lg:w-3/4 lg:mx-0'>
				<Link href={redirect}>
					<a className='flex items-center italic font-bold text-center text-white duration-150 transform hover:scale-105'>
						<FleetIcon className='w-8 h-8 mr-3' />
						<span className='text-4xl'>Fl</span>
						<span className='text-3xl underline'>eet</span>
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
