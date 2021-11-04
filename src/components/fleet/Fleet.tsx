import { Avatar } from '@chakra-ui/avatar';
import { Box, HStack, Icon, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { FleetType } from 'src/shared/types';
import { FleetFooter } from '~components/fleet/FleetFooter';
import { Card } from '~ui/Card';

interface Props {
	fleet: FleetType;
	liked: boolean;
}

export const Fleet = ({ fleet, liked }: Props) => {
	const router = useRouter();
	const avatarSize = useBreakpointValue({
		base: 'sm',
		md: 'md',
	});

	return (
		<Card onClick={() => router.push(`/fleet/${fleet.id}`)} cursor='pointer'>
			<Stack w='100%' display='flex' direction='row'>
				<Box as={Link} href='/profile'>
					<Avatar
						size={avatarSize}
						src={fleet.author.avatarURL}
						cursor='pointer'
						name='user-avatar'
					/>
				</Box>
				<Stack w='100%'>
					<Box w='max-content'>
						<HStack
							role='group'
							cursor='pointer'
							onClick={(e) => {
								e.stopPropagation();
								router.push(`/profile/${fleet.authorId}`);
							}}
						>
							<Text
								as='span'
								fontSize='md'
								fontWeight='semibold'
								_groupHover={{ textDecoration: 'underline' }}
							>
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
					<Text rounded='md' py='2' fontSize='lg'>
						{fleet.body}
					</Text>
					<FleetFooter fleet={fleet} liked={liked} />
				</Stack>
			</Stack>
		</Card>
	);
};
