import React, { useState } from 'react'
import HomeIcon from '../ui/icons/HomeIcon'
import MessageIcon from '../ui/icons/MessageIcon'
import ProfileIcon from '../ui/icons/ProfileIcon'
import GithubIcon from '../ui/icons/GithubIcon'
import MenuLink from '../ui/MenuLink'
import TweetComposer from '../components/TweetComposer'

const Menu = () => {
	const [visible, setVisible] = useState(false)

	const showTweetComposer = (e) => {
		e.preventDefault()

		setVisible(!visible)
	}

	return (
		<div className='flex justify-end h-full px-2 py-4'>
			<div className='flex flex-col space-y-4'>
				<MenuLink type='route' to='/home'>
					<HomeIcon className='w-6 h-6 mr-2' />
					Home
				</MenuLink>
				<MenuLink type='route' to='/messages'>
					<MessageIcon className='w-6 h-6 mr-2' />
					Messages
				</MenuLink>
				<MenuLink type='route' to='/profile'>
					<ProfileIcon className='w-6 h-6 mr-2' />
					Profile
				</MenuLink>
				<MenuLink type='button' onClick={showTweetComposer}>
					Tweet
				</MenuLink>
				<div className='w-full h-20'></div>
				<MenuLink type='site' to='http://github.com/itzakmal/tweety-tweet'>
					<GithubIcon className='w-6 h-6 mr-2' />
					GitHub
				</MenuLink>
			</div>
			<TweetComposer visible={visible} setVisible={setVisible} />
		</div>
	)
}

export default Menu
