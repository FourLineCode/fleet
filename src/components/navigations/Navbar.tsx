import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Avatar, Container, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { DropDown } from '~components/navigations/DropDown';
import { SideMenu } from '~components/navigations/SideMenu';
import { useAuth } from '~store/useAuth';
import { useCurrentUser } from '~store/useCurrentUser';

interface Props {
	route: string;
}

export const Navbar = ({ route }: Props) => {
	const auth = useAuth();
	const user = useCurrentUser();
	const router = useRouter();
	const bgColor = useColorModeValue('light-muted', 'dark-muted');

	return (
		<HStack bg={bgColor} h='14' shadow='base'>
			<Container maxW='container.lg'>
				<Flex justifyContent='space-between'>
					<Flex spacing='0' alignItems='center'>
						<SideMenu />
						<Text fontSize='2xl' fontWeight='semibold'>
							{route}
						</Text>
					</Flex>
					<HStack>
						{auth.authorized && (
							<Avatar
								src={user.avatarURL}
								onClick={() => router.push('/profile')}
								size='sm'
								cursor='pointer'
								_hover={{ border: '1px', borderColor: 'brand.500' }}
							/>
						)}
						<DropDown />
					</HStack>
				</Flex>
			</Container>
		</HStack>
	);
};
