import { Avatar } from '@chakra-ui/avatar';
import { Stack, Text } from '@chakra-ui/layout';
import { Flex, Icon, useBoolean, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaAngleRight, FaShieldAlt } from 'react-icons/fa';
import { UserType } from 'src/shared/types';
import { Card } from '~ui/Card';

interface Props {
	user: UserType;
}

export const UserInfoCard = ({ user }: Props) => {
	const bg = useColorModeValue('light', 'dark');
	const [showArrow, setShowArrow] = useBoolean(false);

	return (
		<Link passHref href={`/profile/${user.id}`}>
			<Card
				as='a'
				bg={bg}
				cursor='pointer'
				role='group'
				onMouseEnter={setShowArrow.on}
				onMouseLeave={setShowArrow.off}
			>
				<Stack
					display='flex'
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Flex alignItems='center'>
						<Avatar src={user.avatarURL} size='sm' mr='2' name='user-avatar' />
						<Stack spacing='0'>
							<Text
								as='span'
								fontSize='sm'
								fontWeight='semibold'
								noOfLines={1}
								_groupHover={{ textDecoration: 'underline' }}
							>
								{user.displayName}
							</Text>
							{user.isAdmin && <Icon color='brand.500' as={FaShieldAlt} ml='2' />}
							<Text as='span' fontSize='xs' noOfLines={1} color='text-muted'>
								@{user.username}
							</Text>
						</Stack>
					</Flex>
					{showArrow && <Icon color='gray.500' as={FaAngleRight} boxSize='5' ml='2' />}
				</Stack>
			</Card>
		</Link>
	);
};
