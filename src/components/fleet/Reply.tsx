import { Avatar, Box, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { ReplyType } from 'src/shared/types';
import { ReplyOptions } from '~components/fleet/ReplyOptions';
import { useCurrentUser } from '~store/useCurrentUser';
import { Card } from '~ui/Card';

interface Props {
	reply: ReplyType;
	to: string;
}

export const Reply = ({ reply, to }: Props) => {
	const router = useRouter();
	const user = useCurrentUser();
	const canDelete = useMemo(() => {
		return user.isAdmin || reply.userId === user.id;
	}, [reply, user]);

	return (
		<Card>
			<Stack w='100%' display='flex' direction='row'>
				<Box as={Link} href='/profile'>
					<Avatar size='sm' src={reply.user.avatarURL} cursor='pointer' mt='5' />
				</Box>
				<Stack w='100%' spacing='0.5'>
					<Flex w='100%' justifyContent='space-between'>
						<Box w='max-content'>
							<Text fontSize='xs' color='text-muted'>
								Reply to @{to}
							</Text>
							<HStack
								role='group'
								cursor='pointer'
								onClick={(e) => {
									e.stopPropagation();
									router.push(`/profile/${reply.userId}`);
								}}
							>
								<Text
									as='span'
									fontSize='sm'
									_groupHover={{ textDecoration: 'underline' }}
								>
									{reply.user.displayName}
								</Text>
								{reply.user.isAdmin && (
									<Icon color='brand.500' as={FaShieldAlt} ml='2' boxSize='4' />
								)}
								<Text as='span' fontSize='sm' color='text-muted'>
									@{reply.user.username}
								</Text>
							</HStack>
							<Text fontSize='xs' color='text-muted'>
								{formatDistanceToNow(new Date(reply.createdAt))}
							</Text>
						</Box>
						<ReplyOptions id={reply.id} fleetId={reply.fleetId} canDelete={canDelete} />
					</Flex>
					<Text rounded='md' py='1' fontSize='sm'>
						{reply.body}
					</Text>
				</Stack>
			</Stack>
		</Card>
	);
};
