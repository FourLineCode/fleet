import {
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Tooltip,
	useColorMode,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
	FaCaretDown,
	FaCog,
	FaMoon,
	FaSignInAlt,
	FaSignOutAlt,
	FaSun,
	FaUser,
	FaUserPlus,
} from 'react-icons/fa';
import { useAuth } from '~store/useAuth';
import { toastProps } from '~theme/theme';

export const DropDown = () => {
	const auth = useAuth();
	const { colorMode, toggleColorMode } = useColorMode();
	const text = useColorModeValue('Dark Mode', 'Light Mode');

	return (
		<Menu placement='bottom-end'>
			<Tooltip label='Menu'>
				<MenuButton
					as={IconButton}
					aria-label='Options'
					icon={<FaCaretDown />}
					rounded='full'
					size='sm'
				/>
			</Tooltip>
			<MenuList>
				{auth.authorized ? <SignedInLinks /> : <SignedOutLinks />}
				<MenuDivider />
				<MenuItem
					_hover={{ color: 'brand.500' }}
					onClick={toggleColorMode}
					icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
				>
					{text}
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

const SignedInLinks = () => {
	const router = useRouter();
	const auth = useAuth();
	const toast = useToast();

	const signoutHandler = async () => {
		const { success, message } = await auth.signout();

		if (success) {
			toast({
				title: message,
				status: 'success',
				...toastProps,
			});
			router.push('/signin');
		} else {
			toast({
				title: message,
				status: 'error',
				...toastProps,
			});
		}
	};

	return (
		<>
			<MenuItem
				_hover={{ color: 'brand.500' }}
				onClick={() => router.push(`/profile/${auth.id}`)}
				icon={<FaUser />}
			>
				Profile
			</MenuItem>
			<MenuItem
				_hover={{ color: 'brand.500' }}
				onClick={() => router.push('/settings')}
				icon={<FaCog />}
			>
				Settings
			</MenuItem>
			<MenuItem color='red.500' onClick={signoutHandler} icon={<FaSignOutAlt />}>
				Sign Out
			</MenuItem>
		</>
	);
};

const SignedOutLinks = () => {
	const router = useRouter();

	return (
		<>
			<MenuItem
				_hover={{ color: 'brand.500' }}
				onClick={() => router.push('/signin')}
				icon={<FaSignInAlt />}
			>
				Sign In
			</MenuItem>
			<MenuItem
				_hover={{ color: 'brand.500' }}
				onClick={() => router.push('/signup')}
				icon={<FaUserPlus />}
			>
				Sign Up
			</MenuItem>
		</>
	);
};
