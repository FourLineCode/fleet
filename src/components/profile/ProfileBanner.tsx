import { Avatar, Box, Image, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { UserType } from 'src/shared/types';

interface Props {
	user: UserType;
}

export const ProfileBanner = ({ user }: Props) => {
	const bg = useColorModeValue('dark-muted', 'light-muted');

	return (
		<Box position='relative'>
			<Box w='100%' h='56' rounded='sm' overflow='hidden' position='relative'>
				<Image
					src={user.bannerURL}
					objectFit='cover'
					w='100%'
					h='100%'
					alt='profile-banner'
				/>
			</Box>
			<Box
				position='absolute'
				bottom='-20'
				left='0'
				right='0'
				bg={bg}
				rounded='full'
				overflow='hidden'
				boxSize='44'
				mt='-24'
				mx='auto'
				p='0.5'
			>
				<Avatar src={user.avatarURL} alt='profile-image' rounded='full' size='full' />
			</Box>
		</Box>
	);
};
