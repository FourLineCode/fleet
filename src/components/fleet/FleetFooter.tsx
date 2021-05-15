import { Stack, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FleetType } from 'src/shared/types';
import { FleetOptions } from '~components/fleet/FleetOptions';
import { useCurrentUser } from '~store/useCurrentUser';

interface Props {
	fleet: FleetType;
}

export const FleetFooter = ({ fleet }: Props) => {
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
			<Stack>
				<Text>Hello</Text>
			</Stack>
			<FleetOptions id={fleet.id} canDelete={canDelete} />
		</Stack>
	);
};
