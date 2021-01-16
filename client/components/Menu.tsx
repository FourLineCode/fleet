import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useAuthorization from '../hooks/useAuthorization'
import GithubIcon from '../ui/icons/GithubIcon'
import HomeIcon from '../ui/icons/HomeIcon'
import MessageIcon from '../ui/icons/MessageIcon'
import ProfileIcon from '../ui/icons/ProfileIcon'
import MenuLink from '../ui/MenuLink'
import FleetComposer from './FleetComposer'

const Menu = () => {
	const [visible, setVisible] = useState(false)
	const auth = useAuthorization()
	const { pathname } = useRouter()

	const showFleetComposer = (e: React.ChangeEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setVisible(!visible)
	}

	return (
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
	)
}

export default Menu
