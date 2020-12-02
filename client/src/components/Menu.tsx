import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'
import GithubIcon from '../ui/icons/GithubIcon'
import HomeIcon from '../ui/icons/HomeIcon'
import MessageIcon from '../ui/icons/MessageIcon'
import ProfileIcon from '../ui/icons/ProfileIcon'
import MenuLink from '../ui/MenuLink'
import TweetComposer from './TweetComposer'

const Menu = () => {
	const [visible, setVisible] = useState(false)
	const auth = useAuthorization()
	const { pathname } = useLocation()

	const showTweetComposer = (e: React.ChangeEvent<HTMLButtonElement>) => {
		e.preventDefault()

		setVisible(!visible)
	}

	return (
		<div className='flex justify-end h-full px-2 py-4'>
			<div className='flex flex-col space-y-4'>
				<MenuLink type='route' to='/home' active={pathname === '/home'}>
					<HomeIcon className='w-6 h-6 mr-2' />
					Home
				</MenuLink>
				<MenuLink
					type='route'
					to='/messages'
					active={pathname === '/messages'}>
					<MessageIcon className='w-6 h-6 mr-2' />
					Messages
				</MenuLink>
				<MenuLink
					type='route'
					to={`/profile/${auth.id}`}
					active={pathname.startsWith('/profile')}>
					<ProfileIcon className='w-6 h-6 mr-2' />
					Profile
				</MenuLink>
				<MenuLink type='button' onClick={showTweetComposer}>
					Tweet
				</MenuLink>
				<div className='w-full h-20'></div>
				<MenuLink type='site' to='http://github.com/fourlinecode/fleet'>
					<GithubIcon className='w-6 h-6 mr-2' />
					GitHub
				</MenuLink>
			</div>
			<TweetComposer visible={visible} setVisible={setVisible} />
		</div>
	)
}

export default Menu
