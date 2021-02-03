import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import useAuthorization from '../../hooks/useAuthorization'
import MenuLink from '../../ui/components/MenuLink'
import GithubIcon from '../../ui/icons/GithubIcon'
import HomeIcon from '../../ui/icons/HomeIcon'
import MessageIcon from '../../ui/icons/MessageIcon'
import PlusIcon from '../../ui/icons/PlusIcon'
import ProfileIcon from '../../ui/icons/ProfileIcon'
import FleetComposer from '../Fleet/FleetComposer'

const Menu = () => {
	const auth = useAuthorization()
	const { pathname } = useRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()

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
						<MenuLink type='button' onClick={onOpen}>
							Fleet
						</MenuLink>
						<div className='w-full h-20'></div>
						<MenuLink type='site' to='https://github.com/fourlinecode/fleet'>
							<div className='flex items-center'>
								<GithubIcon className='w-6 h-6 mr-2' />
								GitHub
							</div>
						</MenuLink>
					</div>
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
					<MenuLink type='button' onClick={onOpen}>
						<PlusIcon className='w-6 h-6 my-1 text-white' />
					</MenuLink>
					<MenuLink type='route' to={`/profile/${auth.id}`} active={pathname.startsWith('/profile')}>
						<a className='flex items-center p-2'>
							<ProfileIcon className='w-6 h-6' />
						</a>
					</MenuLink>
					<MenuLink type='site' to='https://github.com/fourlinecode/fleet'>
						<div className='flex items-center p-2'>
							<GithubIcon className='w-6 h-6' />
						</div>
					</MenuLink>
				</div>
			</div>
			<FleetComposer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</>
	)
}

export default Menu
