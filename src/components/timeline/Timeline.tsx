import { Stack } from '@chakra-ui/react';
import React from 'react';
import { ComposeFleet } from '~components/compose/ComposeFleet';
import { FleetTimeline } from '~components/timeline/FleetTimeline';

export const Timeline = () => {
	return (
		<Stack flex='1'>
			<ComposeFleet />
			<FleetTimeline />
		</Stack>
	);
};
