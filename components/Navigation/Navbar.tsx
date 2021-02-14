import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useAuthorization from '../../hooks/useAuthorization'
import IconButton from '../../ui/components/IconButton'
import FleetIcon from '../../ui/icons/FleetIcon'
import MoonIcon from '../../ui/icons/MoonIcon'
import SunIcon from '../../ui/icons/SunIcon'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	const { signedIn } = useAuthorization()
	const { pathname } = useRouter()
	const { theme, setTheme } = useTheme()
	const redirect = signedIn ? '/home' : pathname

	const switchTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<div className='sticky top-0 left-0 z-40 flex justify-center w-full border-b shadow border-dark-500 bg-light dark:bg-dark-800 h-14'>
			<nav className='flex items-center justify-between w-full mx-4 lg:w-3/4 lg:mx-0'>
				<Link href={redirect}>
					<a className='flex items-center italic font-bold text-center text-black duration-150 transform dark:text-white hover:scale-105'>
						<FleetIcon className='w-8 h-8 mr-3' />
						<div className='items-center hidden sm:block'>
							<span className='text-4xl'>Fl</span>
							<span className='text-3xl underline'>eet</span>
						</div>
					</a>
				</Link>
				<div className='flex items-center space-x-5 text-center'>
					<IconButton
						onClick={switchTheme}
						className='p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-700'
					>
						{theme === 'dark' ? (
							<SunIcon className='w-6 h-6 text-black dark:text-white' />
						) : (
							<MoonIcon className='w-6 h-6 text-black dark:text-white' />
						)}
					</IconButton>
					{signedIn ? <SignedInLinks /> : <SignedOutLinks />}
				</div>
			</nav>
		</div>
	)
}

export default Navbar
