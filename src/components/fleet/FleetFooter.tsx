import { Stack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FleetType } from 'src/shared/types';
import { FleetOptions } from '~components/fleet/FleetOptions';
import { LikeButton } from '~components/fleet/LikeButton';
import { ReplyButton } from '~components/fleet/ReplyButton';
import { useCurrentUser } from '~store/useCurrentUser';

interface Props {
	fleet: FleetType;
	liked: boolean;
}

export const FleetFooter = ({ fleet, liked }: Props) => {
	const user = useCurrentUser();
	const canDelete = useMemo(() => {
		return user.isAdmin || fleet.authorId === user.id;
	}, [fleet, user]);

	return (
		<Stack
			display='flex'
			direction='row'
			justifyContent='space-between'
			cursor='default'
			onClick={(e) => e.stopPropagation()}
		>
			<Stack display='flex' direction='row' spacing='3'>
				<LikeButton initialLiked={liked} id={fleet.id} initialCount={fleet.likes.length} />
				<ReplyButton id={fleet.id} count={fleet.replies.length} />
			</Stack>
			<FleetOptions id={fleet.id} canDelete={canDelete} />
		</Stack>
	);
};
