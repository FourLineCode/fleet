import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Avatar, Container, Tooltip, useColorModeValue } from '@chakra-ui/react';
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
		<HStack bg={bgColor} h='14' shadow='base' position='sticky' top='0' zIndex='sticky'>
			<Container maxW='container.lg'>
				<Flex justifyContent='space-between'>
					<Flex spacing='0' alignItems='center'>
						<SideMenu />
						<Text
							fontSize='2xl'
							fontWeight='semibold'
							cursor='pointer'
							onClick={() => {
								window.scrollTo(0, 0);
							}}
						>
							{route}
						</Text>
					</Flex>
					<HStack>
						{auth.authorized && (
							<Tooltip label='Profile'>
								<Avatar
									src={user.avatarURL}
									onClick={() => router.push(`/profile/${auth.id}`)}
									size='sm'
									cursor='pointer'
									name='user-avatar'
									_hover={{ border: '1px', borderColor: 'brand.500' }}
								/>
							</Tooltip>
						)}
						<DropDown />
					</HStack>
				</Flex>
			</Container>
		</HStack>
	);
};
