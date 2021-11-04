import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Stack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { ReplyType } from 'src/shared/types';
import { Fleet } from '~components/fleet/Fleet';
import { Reply } from '~components/fleet/Reply';
import { FleetData } from '~components/timeline/FleetTimeline';
import { ApiClient } from '~config/ApiClient';

export const FleetView = ({ post, liked }: FleetData) => {
	const router = useRouter();
	const { id } = router.query;
	const barColor = useColorModeValue('light-muted', 'dark-muted');

	const { data } = useQuery(
		`fleet-view-${id}`,
		async () => {
			const res = await ApiClient.get(`/fleet/${id}`);
			return res.data;
		},
		{
			initialData: {
				post,
				liked,
			},
		}
	);

	return (
		<Stack flex='1' spacing='0'>
			{data && (
				<>
					<Fleet fleet={data.post} liked={data.liked} />
					{data.post.replies.length > 0 && (
						<Box w='100%' h='4'>
							<Box w='1' h='100%' bg={barColor} ml='12' />
						</Box>
					)}
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
