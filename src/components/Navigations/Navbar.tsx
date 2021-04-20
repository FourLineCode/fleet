import { IconButton } from '@chakra-ui/button';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Container, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaCaretDown, FaMoon, FaSun } from 'react-icons/fa';
import { SideMenu } from '~/components/Navigations/SideMenu';

interface Props {
	route: string;
}

export const Navbar = ({ route }: Props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const bgColor = useColorModeValue('light-muted', 'dark-muted');

	return (
		<HStack bg={bgColor} h='14'>
			<Container maxW='container.lg'>
				<Flex justifyContent='space-between'>
					<Flex spacing='0' alignItems='center'>
						<SideMenu />
						<Text fontSize='2xl' fontWeight='semibold'>
							{route}
						</Text>
					</Flex>
					<HStack>
						<IconButton
							onClick={toggleColorMode}
							icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
							aria-label='color-mode'
						/>
						<IconButton icon={<FaCaretDown />} aria-label='dropdown' isRound />
					</HStack>
				</Flex>
			</Container>
		</HStack>
	);
};
