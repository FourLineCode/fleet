import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Stack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { FleetType, ReplyType } from 'src/shared/types';
import { Fleet } from '~components/fleet/Fleet';
import { Reply } from '~components/fleet/Reply';
import { ApiClient } from '~config/ApiClient';

interface Props {
	fleet: FleetType;
	liked: boolean;
}

export const FleetView = ({ fleet, liked }: Props) => {
	const router = useRouter();
	const { id } = router.query;
	const barColor = useColorModeValue('light-muted', 'dark-muted');

	const { data } = useQuery(
		'fleet-view',
		async () => {
			const res = await ApiClient.get(`/fleet/${id}`);
			return res.data;
		},
		{
			initialData: {
				post: fleet,
				liked,
			},
		}
	);

	return (
		<Stack flex='1' spacing='0'>
			{data && (
				<>
					<Fleet fleet={data.post} liked={data.liked} />
					<Box w='100%' h='4'>
						<Box w='1' h='100%' bg={barColor} ml='12' />
					</Box>
					<Stack>
						{data.post.replies.map((reply: ReplyType) => (
							<Reply reply={reply} to={data.post.author.username} key={reply.id} />
						))}
					</Stack>
				</>
			)}
		</Stack>
	);
};
