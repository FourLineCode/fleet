import { useRouter } from 'next/router';
import { useAuthorization } from '../../hooks/useAuthorization';
import { MenuLink } from '../../ui/components/MenuLink';
import { GithubIcon } from '../../ui/icons/GithubIcon';
import { HomeIcon } from '../../ui/icons/HomeIcon';
import { MessageIcon } from '../../ui/icons/MessageIcon';
import { PlusIcon } from '../../ui/icons/PlusIcon';
import { ProfileIcon } from '../../ui/icons/ProfileIcon';

interface Props {
	onOpen: () => void;
}

export const BottomMenu = ({ onOpen }: Props) => {
	const auth = useAuthorization();
	const { pathname } = useRouter();

	return (
		<div className='fixed bottom-0 left-0 z-50 block w-full h-16 border-t-2 bg-light dark:bg-dark-800 border-brand-500 rounded-t-md md:hidden'>
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
					<PlusIcon className='w-6 h-6 my-1 text-black dark:text-white' />
				</MenuLink>
				<MenuLink type='route' to={`/profile/${auth.id}`} active={pathname.startsWith('/profile')}>
					<a className='flex items-center p-2'>
						<ProfileIcon className='w-6 h-6' />
					</a>
				</MenuLink>
				<MenuLink type='site' to='https://github.com/fourlinecode/fleet'>
					<div className='flex items-center p-2'>
						<GithubIcon className='w-6 h-6 text-black dark:text-white' />
					</div>
				</MenuLink>
			</div>
		</div>
	);
};
