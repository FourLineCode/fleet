import {
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCaretDown, FaMoon, FaSignInAlt, FaSun, FaUserPlus } from 'react-icons/fa';

export const DropDown = () => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const text = useColorModeValue('Dark Mode', 'Light Mode');

	return (
		<Menu placement='bottom-end'>
			<MenuButton
				as={IconButton}
				aria-label='Options'
				icon={<FaCaretDown />}
				rounded='full'
				size='sm'
			/>
			<MenuList>
				<MenuItem onClick={() => router.push('signup')} icon={<FaUserPlus />}>
					Sign Up
				</MenuItem>
				<MenuItem onClick={() => router.push('signin')} icon={<FaSignInAlt />}>
					Sign In
				</MenuItem>
				<MenuDivider />
				<MenuItem
					onClick={toggleColorMode}
					icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
				>
					{text}
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
