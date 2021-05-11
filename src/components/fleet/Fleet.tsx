import { Avatar } from '@chakra-ui/avatar';
import { Box, HStack, Icon, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { FleetType } from 'src/shared/types';
import { Card } from '~ui/Card';

interface Props {
	fleet: FleetType;
	liked: boolean;
}

export const Fleet = ({ fleet, liked }: Props) => {
	const avatarSize = useBreakpointValue({
		base: 'sm',
		md: 'md',
	});

	return (
		<Card>
			<Stack w='100%' display='flex' direction='row'>
				<Box>
					<Avatar size={avatarSize} src={fleet.author.avatarURL} />
				</Box>
				<Stack w='100%'>
					<Box>
						<HStack>
							<Text as='span' fontSize='md' fontWeight='semibold'>
								{fleet.author.displayName}
							</Text>
							{fleet.author.isAdmin && (
								<Icon color='brand.500' as={FaShieldAlt} ml='2' />
							)}
							<Text as='span' fontSize='sm' color='text-muted'>
								@{fleet.author.username}
							</Text>
						</HStack>
						<Text fontSize='sm' color='text-muted'>
							{formatDistanceToNow(new Date(fleet.createdAt))}
						</Text>
					</Box>
					<Text bg='dark' rounded='md' p='2' fontSize='lg'>
						{fleet.body}
					</Text>
				</Stack>
			</Stack>
		</Card>
	);
};
