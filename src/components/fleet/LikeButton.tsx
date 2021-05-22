import { IconButton, Stack, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { queryClient } from 'src/shared/queryClient';
import { ApiClient } from '~config/ApiClient';

interface Props {
	initialLiked: boolean;
	initialCount: number;
	id: number;
}

export const LikeButton = ({ initialLiked, initialCount, id }: Props) => {
	const [liked, setLiked] = useState(initialLiked);
	const [count, setCount] = useState(initialCount);

	const { mutate } = useMutation(
		async () => {
			const url = liked ? '/fleet/unlike' : '/fleet/like';
			const res = await ApiClient.post(`${url}/${id}`);
			return res.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('fleet-timeline');
				queryClient.invalidateQueries(`fleet-view-${id}`);
			},
		}
	);

	const likeHandler = () => {
		mutate();
		setLiked((curr) => !curr);
		setCount((curr) => Math.max(0, liked ? curr - 1 : curr + 1));
	};

	return (
		<Tooltip label='Like'>
			<Stack display='flex' direction='row' alignItems='center' spacing='0.5'>
				<IconButton
					icon={liked ? <BsHeartFill /> : <BsHeart />}
					aria-label='like-button'
					bg='transparent'
					isRound
					size='sm'
					onClick={likeHandler}
				/>
				<Text>{count}</Text>
			</Stack>
		</Tooltip>
	);
};
