import { IconButton, Stack, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { FleetType } from 'src/shared/types';
import { ApiClient } from '~config/ApiClient';

interface Props {
	initialLiked: boolean;
	fleet: FleetType;
}

export const LikeButton = ({ initialLiked, fleet }: Props) => {
	const [liked, setLiked] = useState(initialLiked);

	useQuery(
		`fleet-liked-${fleet.id}`,
		async () => {
			const res = await ApiClient.get(`/fleet/like/check/${fleet.id}`);
			return res.data;
		},
		{
			onSuccess: (data) => {
				setLiked(data.liked);
			},
		}
	);

	const { mutate } = useMutation(
		async () => {
			const url = liked ? '/fleet/unlike' : '/fleet/like';
			const res = await ApiClient.post(`${url}/${fleet.id}`);
			return res.data;
		},
		{
			onMutate: () => {
				setLiked((cur) => !cur);
			},
			onSuccess: () => {
				queryClient.invalidateQueries('fleet-timeline');
				queryClient.invalidateQueries(`fleet-view-${fleet.id}`);
				queryClient.invalidateQueries(`fleet-liked-${fleet.id}`);
			},
		}
	);

	return (
		<Tooltip label='Like'>
			<Stack display='flex' direction='row' alignItems='center' spacing='0.5'>
				<IconButton
					icon={liked ? <BsHeartFill /> : <BsHeart />}
					aria-label='like-button'
					bg='transparent'
					isRound
					size='sm'
					onClick={() => mutate()}
				/>
				<Text>{fleet.likes.length}</Text>
			</Stack>
		</Tooltip>
	);
};
