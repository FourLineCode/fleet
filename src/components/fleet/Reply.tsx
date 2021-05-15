import { Avatar, Box, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { ReplyType } from 'src/shared/types';
import { Card } from '~ui/Card';

interface Props {
	reply: ReplyType;
	to: string;
}

export const Reply = ({ reply, to }: Props) => {
	const router = useRouter();
	const bgBody = useColorModeValue('light', 'dark');

	return (
		<Card>
			<Stack w='100%' display='flex' direction='row'>
				<Box as={Link} href='/profile'>
					<Avatar size='sm' src={reply.user.avatarURL} cursor='pointer' mt='5' />
				</Box>
				<Stack w='100%'>
					<Box w='max-content'>
						<Text fontSize='xs' color='text-muted'>
							Reply to @{to}
						</Text>
						<HStack
							role='group'
							cursor='pointer'
							onClick={(e) => {
								e.stopPropagation();
								router.push('/profile');
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
					<Text bg={bgBody} rounded='md' p='2' fontSize='sm'>
						{reply.body}
					</Text>
				</Stack>
			</Stack>
		</Card>
	);
};
