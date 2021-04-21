import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Avatar, Container, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { DropDown } from '~/components/Navigations/DropDown';
import { SideMenu } from '~/components/Navigations/SideMenu';

interface Props {
	route: string;
}

export const Navbar = ({ route }: Props) => {
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
						<Avatar size='sm' />
						<DropDown />
					</HStack>
				</Flex>
			</Container>
		</HStack>
	);
};
