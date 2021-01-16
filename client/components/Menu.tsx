import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useAuthorization from '../hooks/useAuthorization'
import GithubIcon from '../ui/icons/GithubIcon'
import HomeIcon from '../ui/icons/HomeIcon'
import MessageIcon from '../ui/icons/MessageIcon'
import PlusIcon from '../ui/icons/PlusIcon'
import ProfileIcon from '../ui/icons/ProfileIcon'
import MenuLink from '../ui/MenuLink'
import FleetComposer from './FleetComposer'

const Menu = () => {
	const [visible, setVisible] = useState(false)
	const [visibleMobile, setVisibleMobile] = useState(false)
	const auth = useAuthorization()
	const { pathname } = useRouter()

	const showFleetComposer = (e: React.ChangeEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setVisible(!visible)
	}

	const showFleetComposerMobile = (e: React.ChangeEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setVisibleMobile(!visible)
	}

	return (
		<>
			<div className='hidden h-full px-2 py-4 md:block md:col-span-1'>
				<div className='flex justify-center xl:justify-end'>
					<div className='flex flex-col space-y-4'>
						<MenuLink type='route' to='/home' active={pathname === '/home'}>
							<a className='flex items-center'>
								<HomeIcon className='w-6 h-6 mr-2' />
								Home
							</a>
						</MenuLink>
						<MenuLink type='route' to='/messages' active={pathname === '/messages'}>
							<a className='flex items-center'>
								<MessageIcon className='w-6 h-6 mr-2' />
								Messages
							</a>
						</MenuLink>
						<MenuLink type='route' to={`/profile/${auth.id}`} active={pathname.startsWith('/profile')}>
							<a className='flex items-center'>
								<ProfileIcon className='w-6 h-6 mr-2' />
								Profile
							</a>
						</MenuLink>
						<MenuLink type='button' onClick={showFleetComposer}>
							Fleet
						</MenuLink>
						<div className='w-full h-20'></div>
						<MenuLink type='site' to='http://github.com/fourlinecode/fleet'>
							<div className='flex items-center'>
								<GithubIcon className='w-6 h-6 mr-2' />
								GitHub
							</div>
						</MenuLink>
					</div>
					<FleetComposer visible={visible} setVisible={setVisible} />
				</div>
			</div>
			<div className='fixed bottom-0 left-0 z-50 block w-full h-16 bg-gray-800 border-t-2 border-green-500 rounded-t-md md:hidden'>
				<div className='flex items-center justify-between h-full p-1'>
					<MenuLink type='route' to='/home' active={pathname === '/home'}>
						<a className='flex items-center p-2'>
							<HomeIcon className='w-6 h-6' />
						</a>
					</MenuLink>
					<MenuLink type='route' to='/messages' active={pathname === '/messages'}>
						<a className='flex items-center p-2'>
							<MessageIcon className='w-6 h-6' />
						</a>
					</MenuLink>
					<MenuLink type='button' onClick={showFleetComposerMobile}>
						<PlusIcon className='w-6 h-6 my-1 text-white' />
					</MenuLink>
					<MenuLink type='route' to={`/profile/${auth.id}`} active={pathname.startsWith('/profile')}>
						<a className='flex items-center p-2'>
							<ProfileIcon className='w-6 h-6' />
						</a>
					</MenuLink>
					<MenuLink type='site' to='http://github.com/fourlinecode/fleet'>
						<div className='flex items-center p-2'>
							<GithubIcon className='w-6 h-6' />
						</div>
					</MenuLink>
				</div>
				<FleetComposer visible={visibleMobile} setVisible={setVisibleMobile} />
			</div>
		</>
	)
}

export default Menu
